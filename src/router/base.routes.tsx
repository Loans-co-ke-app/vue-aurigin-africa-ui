import { AuriginAfricaRouteMetaType } from "@/types";
import { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";

const baseRouter: RouteRecordRaw = {
  path: "/",
  name: "base-wrapper",
  component: () =>
    import(/* webpackChunkName: "base-wrapper" */ "@/layouts/BaseLayout.vue"),
  children: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/home/Homepage.vue"),
    },
   
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.authenticated) {
          // authStore.logoutUser();
          next({ name: from.name ? from.name : "home" });
        } else {
          
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "register" */ "@/views/Register.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.authenticated) {
          next({ name: from.name ? from.name : "home" });
        } else {
          next();
        }
      },
    },

    /**
     * This route is used to activate the user's account
     * It is accessed via OTP sent to the user's email
     * The link contains a token that is used to verify the user
     * The token is sent to the backend to verify the user
     * The user is then redirected to the login page
     */
    {
      path: "/auth/account-activation",
      name: "activateAccount",
      meta: { requiresAuth: true } satisfies AuriginAfricaRouteMetaType,
      component: () =>
        import(
          /* webpackChunkName: "account-activation" */ "@/views/ActivateAccount.vue"
        ),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.authenticated) {
          next({ name: from.name ? from.name : "home" });
        } else {
          next();
        }
      },
    },
    /**
     * This route is used to send a password reset link to the user's email
     * The user is redirected to the login page after the link is sent
     * The user is then redirected to the password reset page
     * The user is then redirected to the login page
     * The user is then redirected to the password reset page
     */
    {
      path: "/auth/forgot-password",
      name: "forgotPassword",
      component: () =>
        import(
          /* webpackChunkName: "forgot-password" */ "@/views/ForgotPassword.vue"
        ),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.authenticated) {
          next({ name: from.name ? from.name : "home" });
        } else {
          next();
        }
      },
    },
    /**
     * This route is used to reset the password of a user
     * It is accessed via a link sent to the user's email
     * The link contains a token that is used to verify the user
     * The token is sent to the backend to verify the user
     * The user is then redirected to the password reset page
     */
    {
      path: "/auth/reset-password",
      name: "resetPassword",
      component: () =>
        import(
          /* webpackChunkName: "password-reset-confirm" */ "@/views/ResetPassword.vue"
        ),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.authenticated) {
          authStore.logoutUser();
          next();
        } else {
          next();
        }
      },
    },
    /**
     * This route is used to logout the user
     * The user is redirected to the login page after logout
     *
     */
    {
      path: "/logout",
      name: "logout",
      meta: { requiresAuth: true } satisfies AuriginAfricaRouteMetaType,
      component: () =>
        import(/* webpackChunkName: "logout" */ "@/views/Logout.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        authStore.logoutUser();
        next({ name: "login" });
      },
    },
  ],
};

export default baseRouter;

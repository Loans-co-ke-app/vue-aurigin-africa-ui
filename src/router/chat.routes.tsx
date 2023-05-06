import { AuriginAfricaRouteMetaType } from "@/types";
import { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";

const chatRouter: RouteRecordRaw = {
  path: "/chat",
  name: "chat-base-wrapper",
  component: () =>
    import(
      /* webpackChunkName: "chat-base-wrapper" */ "@/layouts/ChatLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "chat",
      component: () =>
        import(
          /* webpackChunkName: "chat-component" */ "@/components/chat/ChatComponent.vue"
        ),
    },
    {
      // Match any other route
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () =>
        import(
          /* webpackChunkName: "not-found" */ "@/components/chat/ChatNotFound.vue"
        ),
    },
  ],
};

export default chatRouter;

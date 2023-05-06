import { AuriginAfricaRouteMetaType } from "@/types";
import { RouteRecordRaw } from "vue-router";

const adminRouter: RouteRecordRaw = {
  path: "/admin",
  name: "admin-wrapper",
  meta: {
    requiresAuth: true,
    roles: ["user", "admin", `guest`],
  } satisfies AuriginAfricaRouteMetaType,
  component: () =>
    import(/* webpackChunkName: "admin-wrapper" */ "@/layouts/AdminLayout.vue"),
  children: [],
};

export default adminRouter;

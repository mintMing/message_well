import { createRouter, createWebHashHistory } from "vue-router";
import constantRoute from "./routes.js";

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoute,
});

export default router;

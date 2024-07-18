const constantRoute = [
    {
        path: "/",
        name: "index",
        component: () => import("@/views/index.vue"),
    },
];

export default constantRoute;

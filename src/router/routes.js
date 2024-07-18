const constantRoute = [
    {
        path: "/",
        name: "index",
        component: () => import("@/views/index.vue"),
        redirect: "wall",
        children: [
            {
                path: "wall",
                component: () => import("@/views/messageWell/MessageWell.vue"),
            },
        ],
    },
];

export default constantRoute;

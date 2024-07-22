import axiosInstance from "../utils/request";

const _api = [
    {
        CREATEMESSAGES_URL: "/messages",
        CREATECOMMENT_URL: "/comment",
        DELETEWALL_URL: "/wall/:id",
        DELETEFEEDBACK_URL: "/feedback/:id",
        DELETECOMMENT_URL: "/comment/:id",
        ALLWALL_URL: "/wall",
        ALLCOMMENT_URL: "/wall/:wallId/comment",
        SIGNINIP_URL: "/signip",
    },
];

const signipApi = () => {
    return axiosInstance.post(_api[0].SIGNINIP_URL);
};

const insertWallApi = (data) => {
    return axiosInstance.post(_api[0].CREATEMESSAGES_URL, data);
};

export { signipApi, insertWallApi };

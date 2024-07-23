import axiosInstance from "../utils/request";

const _api = [
    {
        CREATEMESSAGES_URL: "/messages",
        CREATECOMMENT_URL: "/comment",
        DELETEWALL_URL: "/wall/:id",
        DELETEFEEDBACK_URL: "/feedback/:id",
        DELETECOMMENT_URL: "/comment/:id",
        ALLWALL_URL: "/wall",
        ALLCOMMENT_URL: `/wall/:wallId/comment`,
        SIGNINIP_URL: "/signip",
        CREATEFEEDBACK_URL: "/feedback",
    },
];

// 获取访问者 ip
const signipApi = () => {
    return axiosInstance.get(_api[0].SIGNINIP_URL);
};

// 新建wall
const insertWallApi = (data) => {
    return axiosInstance.post(_api[0].CREATEMESSAGES_URL, data);
};

// 查询墙
const findWallPageApi = (data) => {
    const { page, pageSize, type, label, user_id } = data;
    return axiosInstance.get(_api[0].ALLWALL_URL, {
        params: {
            page,
            pageSize,
            type,
            label,
            user_id,
        },
    });
};

const insertFeedbackApi = (data) => {
    return axiosInstance.post(_api[0].CREATEFEEDBACK_URL, data);
};

const insertCommentApi = (data) => {
    return axiosInstance.post(_api[0].CREATECOMMENT_URL, data);
};

const findCommentPageApi = (data) => {
    // console.log(data);
    const { page, pageSize, id } = data;
    return axiosInstance.get(
        _api[0].ALLCOMMENT_URL.replace(":wallId", data.id),
        {
            params: {
                page,
                pageSize,
                id,
            },
        },
    );
};

const profileApi = (data) => {
    return axiosInstance.post("/profile", data);
};

export {
    signipApi,
    insertWallApi,
    findWallPageApi,
    insertFeedbackApi,
    insertCommentApi,
    findCommentPageApi,
    profileApi,
};

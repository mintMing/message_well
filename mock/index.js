// const Mock = require("mockjs");
import Mock from "mockjs";

const note = Mock.mock({
    "data|19": [
        {
            moment: new Date(),
            "id|+1": 1,
            "userId|+1": 10,
            "message|24-96": "@cword",
            "label|0-10": 0,
            name: "@cname",
            "comment|0-120": 0,
            "imgurl|0-4": 0,
            "revoke |0-20": 0,
            "report|0-20": 0,
            type: 0,
            "like|0-120": 0,
        },
    ],
});

const comment = Mock.mock({
    "data|19": [
        {
            moment: new Date(),
            "id|+1": 1,
            "userId|+1": 10,
            "message|24-96": "@cword",
            name: "@cname",
            "imgurl|0-14": 0,
        },
    ],
});

const photo = Mock.mock({
    "data|19": [
        {
            moment: new Date(),
            "id|+1": 1,
            "userId|+1": 10,
            "message|24-96": "@cword",
            "label|0-10": 0,
            name: "@cname",
            "comment|0-120": 0,
            "imgurl|0-4": 0,
            "revoke |0-20": 0,
            "report|0-20": 0,
            type: 0,
            "like|0-120": 0,
        },
    ],
});

export { note, comment, photo };

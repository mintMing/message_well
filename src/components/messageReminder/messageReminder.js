import { createVNode, render } from "vue";
import messageReminder from "./message-reminder.vue";

const divVNode = createVNode("div", {
    class: "message-container",
});

render(divVNode, document.body);

const div = divVNode.el;

const Message = ({ message, type }) => {
    const comVNode = createVNode(messageReminder, { message, type });
    render(comVNode, div);
    setTimeout(() => {
        render(null, div);
    }, 6000);
};

export default Message;

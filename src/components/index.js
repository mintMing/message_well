import TopBar from "./topBar/top-bar.vue";
import CommonButton from "./button/common-button.vue";
import FootBar from "./footBar/foot-bar.vue";
import NodeCard from "./nodeCard/node-card.vue";
import Modal from "./modal/modal.vue";
import NewCard from "./newCard/new-card.vue";
import CardDetail from "./cardDetail/card-detail.vue";
import PictureWall from "./pictureWall/picture-wall.vue";
import WaterFall from "./waterFall/water-fall.vue";
import Viewer from "./viewer/viewer.vue";
import MessageReminder from "./messageReminder/message-reminder.vue";
import Message from "./messageReminder/messageReminder.js";

const allGloablComponent = {
    TopBar,
    CommonButton,
    FootBar,
    NodeCard,
    Modal,
    NewCard,
    CardDetail,
    PictureWall,
    WaterFall,
    Viewer,
    MessageReminder,
};

const aGCObj = {
    install(app) {
        Object.keys(allGloablComponent).forEach((key) => {
            app.component(key, allGloablComponent[key]);
        });

        // ..
        // app.config.globalProperties.$message = Message;
        app.provide("message", Message);
    },
};

export default aGCObj;

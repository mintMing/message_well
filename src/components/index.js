import TopBar from "./topBar/top-bar.vue";
import CommonButton from "./button/common-button.vue";
import FootBar from "./footBar/foot-bar.vue";
import NodeCard from "./nodeCard/node-card.vue";
import Modal from "./modal/modal.vue";
import NewCard from "./newCard/new-card.vue";

const allGloablComponent = {
    TopBar,
    CommonButton,
    FootBar,
    NodeCard,
    Modal,
    NewCard,
};

const aGCObj = {
    install(app) {
        Object.keys(allGloablComponent).forEach((key) => {
            app.component(key, allGloablComponent[key]);
        });
    },
};

export default aGCObj;

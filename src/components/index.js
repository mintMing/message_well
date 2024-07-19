import topBar from "./topBar/top-bar.vue";
import CommonButton from "./button/common-button.vue";
import footBar from "./footBar/foot-bar.vue";
import nodeCard from "./nodeCard/node-card.vue";
import modal from "./modal/modal.vue";

const allGloablComponent = {
    topBar,
    CommonButton,
    footBar,
    nodeCard,
    modal,
};

const aGCObj = {
    install(app) {
        Object.keys(allGloablComponent).forEach((key) => {
            app.component(key, allGloablComponent[key]);
        });
    },
};

export default aGCObj;

import topBar from "./topBar/top-bar.vue";
import CommonButton from "./button/common-button.vue";
import footBar from "./footBar/foot-bar.vue";
import nodeCard from "./nodeCard/node-card.vue";

const allGloablComponent = {
    topBar,
    CommonButton,
    footBar,
    nodeCard,
};

const aGCObj = {
    install(app) {
        Object.keys(allGloablComponent).forEach((key) => {
            app.component(key, allGloablComponent[key]);
        });
    },
};

export default aGCObj;

import topBar from "./topBar/top-bar.vue";
import CommonButton from "./button/common-button.vue";
import footBar from "./footBar/foot-bar.vue";

const allGloablComponent = {
    topBar,
    CommonButton,
    footBar,
};

const aGCObj = {
    install(app) {
        Object.keys(allGloablComponent).forEach((key) => {
            app.component(key, allGloablComponent[key]);
        });
    },
};

export default aGCObj;

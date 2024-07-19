import topBar from "./topBar/top-bar.vue";
import CommonButton from "./button/common-button.vue";

const allGloablComponent = {
    topBar,
    CommonButton,
};

const aGCObj = {
    install(app) {
        Object.keys(allGloablComponent).forEach((key) => {
            app.component(key, allGloablComponent[key]);
        });
    },
};

export default aGCObj;

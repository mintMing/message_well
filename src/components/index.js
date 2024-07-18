import topBar from "./topBar/top-bar.vue";

const allGloablComponent = {
    topBar,
};

const aGCObj = {
    install(app) {
        Object.keys(allGloablComponent).forEach((key) => {
            app.component(key, allGloablComponent[key]);
        });
    },
};

export default aGCObj;

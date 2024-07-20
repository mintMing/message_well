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
};

const aGCObj = {
    install(app) {
        Object.keys(allGloablComponent).forEach((key) => {
            app.component(key, allGloablComponent[key]);
        });
    },
};

export default aGCObj;

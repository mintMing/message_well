import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router/index.js";
import pinia from "@/store/index.js";
import "@/styles/index.scss";
import aGCObj from "@/components/index.js";

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(aGCObj);

app.mount("#app");

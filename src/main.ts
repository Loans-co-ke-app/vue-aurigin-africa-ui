import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import FontAwesomeIcon from "./plugins/fontawesome";
import piniaPlugin from "./plugins/piniaPlugin";
import "./assets/main.css";

const app = createApp(App);

app.use(router).use(piniaPlugin).component("fa", FontAwesomeIcon);
app.mount("#app");

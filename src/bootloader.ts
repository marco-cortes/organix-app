import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";
import locales from "./plugins/locales";
import router from "./router";
const app = createApp(App)
app.use(locales);
app.use(router);
app.mount("#app");

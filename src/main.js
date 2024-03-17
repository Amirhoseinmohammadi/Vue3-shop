import { createApp } from "vue";
import {Vue3TailwindPagination} from "vue-3-tailwind-css-pagination";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index";
import "./style.css";
import "./tailwind.css";
const app = createApp(App);
const pinia = createPinia();
app.component('Vue3TailwindPagination', Vue3TailwindPagination)
app.use(router);
app.use(pinia);
app.mount("#app");

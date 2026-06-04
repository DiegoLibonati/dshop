import { createApp } from "vue";

import App from "@product-detail/App.vue";

import "@product-detail/index.css";

const app = createApp(App);
app.provide("mfeCallbacks", {
  onNavigate: (path: string) => {
    window.location.href = path;
  },
});
app.mount(document.getElementById("root")!);

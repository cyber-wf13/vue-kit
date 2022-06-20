import { createApp } from "vue";
import { TooltipDirective, directiveName } from "@/directives/TooltipDirective";
import App from "./App.vue";

const app = createApp(App);

app.directive(directiveName, TooltipDirective);
app.mount("#app");

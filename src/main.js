import { createApp } from "vue";
import { TooltipDirective, directiveName } from "@/directives/TooltipDirective";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCircleExclamation,
  faTriangleExclamation,
  faCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";

const app = createApp(App);

library.add(
  faCircleExclamation,

  faTriangleExclamation,
  faCircle,
  faCheck
);

app.component("font-awesome-icon", FontAwesomeIcon);
app.directive(directiveName, TooltipDirective);

app.mount("#app");

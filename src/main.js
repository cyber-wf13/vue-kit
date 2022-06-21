import { createApp } from "vue";
import { TooltipDirective, directiveName } from "@/directives/TooltipDirective";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCircleExclamation,
  faTriangleExclamation,
  faCircle,
  faCheck,
  faBriefcase,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";

const app = createApp(App);

library.add(
  faCircleExclamation,
  faBriefcase,
  faTriangleExclamation,
  faCircle,
  faCheck,
  faTrashCan
);

app.component("font-awesome-icon", FontAwesomeIcon);
app.directive(directiveName, TooltipDirective);

app.mount("#app");

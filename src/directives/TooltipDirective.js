export const TooltipDirective = {
  mounted(el, binding) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = binding.value;
    tooltip.setAttribute("data-object-tooltip", "");

    if (binding.arg) {
      tooltip.style = `--tooltip-color: ${binding.arg};`;
    }

    el.appendChild(tooltip);
    el.setAttribute("data-parent-tooltip", "");
  },
  updated(el, binding) {
    const tooltip = el.querySelector("[data-object-tooltip]");
    tooltip.textContent = binding.value;
  },
};

export const directiveName = "tooltip";

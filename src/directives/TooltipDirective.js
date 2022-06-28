export const TooltipDirective = {
  mounted(el, binding) {
    document.addEventListener("DOMContentLoaded", () => {
      const tooltip = document.createElement("div");
      const indentBottom = 20;

      tooltip.classList.add("tooltip");
      tooltip.textContent = binding.value;
      document.body.appendChild(tooltip);

      const tooltipCoords = {
        x: el.getBoundingClientRect().x,
        y: el.getBoundingClientRect().top + window.scrollY,
      };

      if (binding.arg) {
        tooltip.style = `--tooltip-color: ${binding.arg}`;
      }

      const { height, width } = tooltip.getBoundingClientRect();
      const parentWidth = el.getBoundingClientRect().width;

      tooltipCoords.y = tooltipCoords.y - height - indentBottom;
      tooltipCoords.x = tooltipCoords.x + parentWidth / 2 - width / 2;
      tooltip.style.top = `${tooltipCoords.y}px`;
      tooltip.style.left = `${tooltipCoords.x}px`;
      // tooltip.classList.add("tooltip--visible");

      el.addEventListener("mouseenter", () => {
        tooltip.classList.add("tooltip--visible");
      });

      el.addEventListener("mouseleave", () => {
        tooltip.classList.remove("tooltip--visible");
      });
    });
  },
};

export const directiveName = "tooltip";

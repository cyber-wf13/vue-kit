export const TooltipDirective = {
  mounted(el, binding) {
    window.addEventListener("load", setDirective);
    function setDirective() {
      const tooltip = document.createElement("div");
      const indentBottom = 20;

      tooltip.classList.add("tooltip");
      tooltip.textContent = binding.value;
      document.body.appendChild(tooltip);

      const tooltipCoords = {
        x: 0,
        y: 0,
      };

      if (binding.arg) {
        tooltip.style = `--tooltip-color: ${binding.arg}`;
      }

      const { height, width } = tooltip.getBoundingClientRect();
      const parentWidth = el.getBoundingClientRect().width;

      el.addEventListener("mouseenter", (e) => {
        const target = e.currentTarget;
        const elemY = target.getBoundingClientRect().top + window.scrollY;
        const elemX = target.getBoundingClientRect().x;
        tooltipCoords.y = elemY - height - indentBottom;
        tooltipCoords.x = elemX + parentWidth / 2 - width / 2;
        tooltip.style.top = `${tooltipCoords.y}px`;
        tooltip.style.left = `${tooltipCoords.x}px`;
        tooltip.classList.add("tooltip--visible");
      });

      el.addEventListener("mouseleave", () => {
        tooltip.classList.remove("tooltip--visible");
      });
    }
  },
};

export const directiveName = "tooltip";

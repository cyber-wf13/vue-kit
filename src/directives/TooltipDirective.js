export const TooltipDirective = {
  mounted(el, binding) {
    const tooltip = document.createElement("div");
    const indentBottom = 20;

    const tooltipCoords = {
      x: el.getBoundingClientRect().x,
      y: el.getBoundingClientRect().y + window.scrollY,
    };
    tooltip.classList.add("tooltip");
    tooltip.textContent = binding.value;

    document.body.appendChild(tooltip);

    if (binding.arg) {
      console.log(binding.arg);
      tooltip.style = `--tooltip-color: ${binding.arg}`;
    }

    const { height, width } = tooltip.getBoundingClientRect();
    const parentWidth = el.getBoundingClientRect().width;

    tooltipCoords.y = tooltipCoords.y - height - indentBottom;
    tooltipCoords.x = tooltipCoords.x + parentWidth / 2 - width / 2;
    tooltip.style.top = `${tooltipCoords.y}px`;
    tooltip.style.left = `${tooltipCoords.x}px`;

    el.addEventListener("mouseenter", () => {
      tooltip.classList.add("tooltip--visible");
    });

    el.addEventListener("mouseleave", () => {
      tooltip.classList.remove("tooltip--visible");
    });
  },
};

export const directiveName = "tooltip";

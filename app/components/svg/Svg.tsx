"use client";
import { useEffect, useState } from "react";

type SvgProps = {
  icon?: any;
  color?: string;
  iconColor?: string;
  alt?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  onClick?: () => void;
  gradient?: {
    id: string;
    colors: string[];
    direction?: "vertical" | "horizontal";
  } | null;
};

const Svg: React.FC<SvgProps> = ({
  icon,
  color = "white",
  height = "100%",
  width = "100%",
  iconColor,
  className,
  onClick,
  gradient,
}) => {
  const [svgCode, setSvgCode] = useState("");
  const [computedColor, setComputedColor] = useState("");

  useEffect(() => {
    if (icon) {
      fetch(icon.src)
        .then((response) => response.text())
        .then((svgString) => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
          const svgEl = svgDoc.children[0];

          svgEl.setAttribute("preserveAspectRatio", "xMidYMid slice");

          const serializer = new XMLSerializer();
          const updatedSvgString = serializer.serializeToString(svgEl);

          setSvgCode(updatedSvgString);
        })
        .catch((error) => console.error(error));
    }
  }, [icon]);

  useEffect(() => {
    if (color.startsWith("text")) {
      const element = document.createElement("div");
      element.classList.add(color);
      document.body.appendChild(element);

      const computedStyle = getComputedStyle(element);
      const colorCode = computedStyle.color;

      setComputedColor(colorCode);

      document.body.removeChild(element);
    } else {
      setComputedColor(color);
    }
  }, [color]);

  const createGradient = (gradient: {
    id: string;
    colors: string[];
    direction?: "vertical" | "horizontal";
  }) => {
    const gradientDirection =
      gradient.direction === "vertical" ? "0% 100%" : "100% 0%";

    let gradientStops = "";
    const stopGap = 100 / (gradient.colors.length - 1);
    gradient.colors.forEach((color, i) => {
      const offset = i * stopGap;
      gradientStops += `<stop offset="${offset}%" style="stop-color:${color}"/>`;
    });

    return `<defs><linearGradient id="${gradient.id}" x1="0%" y1="0%" x2="${gradientDirection}">${gradientStops}</linearGradient></defs>`;
  };

  const replaceFillColors = (svg: string, color: string) => {
    if (color.startsWith("url")) {
      return svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    } else {
      return svg.replace(/fill="[^"]*/g, `fill="${color}"`);
    }
  };

  const fillColor = iconColor || computedColor;
  let svgWithCustomColor;
  if (gradient) {
    const gradientString = createGradient(gradient);
    svgWithCustomColor = svgCode.replace("<svg", `<svg>${gradientString}`);
    svgWithCustomColor = replaceFillColors(
      svgWithCustomColor,
      `url(#${gradient.id})`
    );
  } else {
    svgWithCustomColor = replaceFillColors(svgCode, fillColor);
  }

  const svgWithDimensions = svgWithCustomColor.replace(
    /<svg([^>]*)>/,
    `<svg\$1 height="${height}" width="${width}" preserveAspectRatio="xMidYMid slice">`
  );

  return (
    <div
      className={`pointer-events-none ${className}`}
      dangerouslySetInnerHTML={{ __html: svgWithDimensions }}
      onClick={onClick}
    />
  );
};

export default Svg;

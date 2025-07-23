import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
}

const getShadowStyle = (shadow: CardProps["shadow"]) => {
  switch (shadow) {
    case "sm":
      return "0 1px 3px rgba(0,0,0,0.12)";
    case "md":
      return "0 4px 6px rgba(0,0,0,0.1)";
    case "lg":
      return "0 10px 15px rgba(0,0,0,0.1)";
    default:
      return "none";
  }
};

const getRadiusStyle = (radius: CardProps["radius"]) => {
  switch (radius) {
    case "sm":
      return "4px";
    case "md":
      return "8px";
    case "lg":
      return "16px";
    default:
      return "0";
  }
};

export const Card: React.FC<CardProps> = ({
  children,
  padding = "16px",
  shadow = "md",
  radius = "md",
  bordered = false,
  style,
  ...props
}) => {
  return (
    <div
      style={{
        padding,
        boxShadow: getShadowStyle(shadow),
        borderRadius: getRadiusStyle(radius),
        backgroundColor: "white",
        border: bordered ? "1px solid #e0e0e0" : "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

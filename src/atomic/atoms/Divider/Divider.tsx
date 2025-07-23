import React from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  color?: string;
  margin?: string;
  vertical?: boolean;
  thickness?: number;
}

export const Divider: React.FC<DividerProps> = ({
  color = "#e0e0e0",
  margin = "16px 0",
  vertical = false,
  thickness = 1,
  style,
  ...props
}) => {
  return (
    <hr
      style={{
        border: "none",
        margin,
        ...(vertical
          ? {
              borderLeft: `${thickness}px solid ${color}`,
              height: "100%",
              width: 0,
              display: "inline-block",
            }
          : {
              borderTop: `${thickness}px solid ${color}`,
              width: "100%",
            }),
        ...style,
      }}
      {...props}
    />
  );
};

export default Divider;

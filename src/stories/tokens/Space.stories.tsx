import React from "react";
import { space } from "../../tokens/space";

const SpaceTable = () => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(space).map(([key, value]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
          <td>
            <div
              style={{
                width: value,
                height: "16px",
                background: "#eee",
                display: "inline-block",
                border: "1px solid #ccc",
              }}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const meta = {
  title: "0-Design System/Spacing Tokens",
  component: SpaceTable,
  parameters: {
    docs: {
      description: {
        component:
          "This page documents the spacing scale used in the design system.",
      },
    },
  },
};
export default meta;

export const Spacing = {
  render: () => <SpaceTable />,
};

import { color } from "../../tokens/color";

const ColorTable = () => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(color).map(([key, value]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
          <td>
            <div
              style={{
                width: 32,
                height: 16,
                background: value,
                border: "1px solid #ccc",
                display: "inline-block",
              }}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default {
  title: "0-Design System/Color Tokens",
  parameters: {
    docs: {
      description: {
        component:
          "This page documents the color palette used in the design system.",
      },
    },
  },
};

export const Colors = () => <ColorTable />;

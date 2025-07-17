import React from 'react';
import { typography } from '../../tokens/typography';

const TypographyTable = () => (
  <table>
    <thead>
      <tr><th>Type</th><th>Preview</th><th>Token</th></tr>
    </thead>
    <tbody>
      {Object.entries(typography).map(([key, value]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>
            <span style={{ fontSize: value.fontSize, fontWeight: value.fontWeight, lineHeight: value.lineHeight }}>
              {key.charAt(0).toUpperCase() + key.slice(1)} Example
            </span>
          </td>
          <td>{JSON.stringify(value)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const meta = {
  title: 'Tokens/Typography Tokens',
  component: TypographyTable,
  parameters: {
    docs: {
      description: {
        component: 'This page documents the typography scale used in the design system.'
      }
    }
  }
};
export default meta;

export const Typography = {
  render: () => <TypographyTable />,
};

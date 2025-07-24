import React from 'react';
import { typography } from '../../tokens/typography';

const tableStyle: React.CSSProperties = {
  fontFamily: 'Inter, Arial, sans-serif',
  fontSize: '15px',
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: 16,
};
const thtdStyle: React.CSSProperties = {
  padding: '8px 12px',
  border: '1px solid #e0e0e0',
  textAlign: 'left',
};
const previewFont: React.CSSProperties = {
  fontFamily: 'Inter, Arial, sans-serif',
  display: 'inline-block',
};

const TypographyTable = () => (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={thtdStyle}>Type</th>
        <th style={thtdStyle}>Preview</th>
        <th style={thtdStyle}>Token</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(typography).map(([key, value]) => (
        <tr key={key}>
          <td style={thtdStyle}>{key}</td>
          <td style={thtdStyle}>
            <span
              style={{
                ...previewFont,
                fontSize: value.fontSize,
                fontWeight: value.fontWeight,
                lineHeight: value.lineHeight,
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)} Example
            </span>
          </td>
          <td style={thtdStyle}>{JSON.stringify(value)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default {
  title: 'Design Tokens/Typography Tokens',
  parameters: {
    docs: {
      description: {
        component: 'This page documents the typography scale used in the design system.',
      },
    },
  },
};

export const Typography = () => <TypographyTable />;

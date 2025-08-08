import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Card } from '../../atoms/Card/Card';
import { Divider } from '../../atoms/Divider/Divider';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
  actions?: React.ReactNode[];
}

export const Form: React.FC<FormProps> = ({
  title,
  children,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
  isSubmitting = false,
  actions = [],
  ...props
}) => {
  return (
    <Card style={{ maxWidth: '600px' }}>
      {title && (
        <>
          <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 500 }}>{title}</h2>
          <Divider margin="0 0 20px" />
        </>
      )}

      <form {...props}>
        <div style={{ marginBottom: '24px' }}>{children}</div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          {actions.map((action, index) => (
            <div key={index}>{action}</div>
          ))}

          {onCancel && (
            <Button variant="secondary" onClick={() => onCancel()}>
              {cancelLabel}
            </Button>
          )}

          <Button variant="primary">{isSubmitting ? 'Submitting...' : submitLabel}</Button>
        </div>
      </form>
    </Card>
  );
};

export default Form;

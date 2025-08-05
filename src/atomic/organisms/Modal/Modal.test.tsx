import { render } from '@testing-library/react';
import { Modal } from './Modal';
describe('Modal Component', () => {
  it('renders without crashing', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
  });
});

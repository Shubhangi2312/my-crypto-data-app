import React from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const StockModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Select Stock or Crypto</h2>
      {/* Form or dropdown for selecting different stocks/cryptos */}
      <button onClick={onClose}>Close Modal</button>
    </Modal>
  );
};

export default StockModal;

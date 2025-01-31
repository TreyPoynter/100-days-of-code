import { ReactNode } from "react";
import './styles/modal.css'

interface ModalProps {
  children?: ReactNode | undefined,
  isOpen: boolean,
  onClose?: () => unknown
}

export default function Modal({ children, isOpen, onClose } : ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <button style={{cursor: 'pointer'}} onClick={onClose}>Close</button>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
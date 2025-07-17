import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconClose } from './Icons/icon-close';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[rgba(20,24,31,0.25)] animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`relative bg-white shadow-xl w-[800px] max-w-[90vw] h-full p-12 overflow-y-auto animate-slideIn ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <IconClose width={24} height={24} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
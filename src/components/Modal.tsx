import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconClose } from './Icons/icon-close';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
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
        className={`relative bg-white shadow-xl w-full md:w-[800px] max-w-[90vw] h-full p-4 md:p-8 overflow-y-auto animate-slideIn ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h4 >
            {title}
          </h4>
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className="flex items-center justify-center top-4 right-4 p-2 transition-colors cursor-pointer "
              aria-label="Close modal"
            >
              {title && <p className=''>Disconnect</p>}
              <IconClose width={24} height={24} color='rgb(var(--color-mono))' />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
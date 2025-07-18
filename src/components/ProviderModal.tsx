import React from 'react';
import { closeModal } from '../store/slices/providersSlice';
import Modal from './Modal';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const ProviderModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modalOpen, selectedProvider, currentStep } = useAppSelector((state) => state.providers);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'connecting':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            {selectedProvider?.logo && (
              <img 
                src={selectedProvider.logo} 
                alt={selectedProvider.name}
                className="w-32 h-32 object-contain mb-8"
              />
            )}
            <h2 className="text-2xl font-medium text-gray-900">Connecting...</h2>
          </div>
        );
      
      case 'retrieving':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            {selectedProvider?.logo && (
              <img 
                src={selectedProvider.logo} 
                alt={selectedProvider.name}
                className="w-32 h-32 object-contain mb-8"
              />
            )}
            <h2 className="text-2xl font-medium text-gray-900">Retrieving Data...</h2>
          </div>
        );
      
      case 'details':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Details Form</h2>
            <p>Form fields will go here</p>
          </div>
        );
      
      case 'payment':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Form</h2>
            <p>Payment form will go here</p>
          </div>
        );
      
      case 'confirmation':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
            <p>Confirmation will go here</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal 
      isOpen={modalOpen} 
      onClose={handleClose}
      showCloseButton={currentStep !== 'connecting' && currentStep !== 'retrieving'}
      closeOnOverlayClick={currentStep !== 'connecting' && currentStep !== 'retrieving'}
    >
      {renderContent()}
    </Modal>
  );
};

export default ProviderModal;
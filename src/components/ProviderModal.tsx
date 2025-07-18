import React from 'react';
import { closeModal, setCurrentStep, saveDetailsForm } from '../store/slices/providersSlice';
import Modal from './Modal';
import DynamicForm from './DynamicForm';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const ProviderModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modalOpen, selectedProvider, currentStep, formFields } = useAppSelector((state) => state.providers);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    dispatch(saveDetailsForm(data));
    dispatch(setCurrentStep('payment'));
  };

  const handleFormCancel = () => {
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
                className="w-40 h-auto object-contain mb-16"
              />
            )}
            <p className="text-sm font-regular text-[rgb(var(--color-neutral))]">Connecting...</p>
          </div>
        );
      
      case 'retrieving':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            {selectedProvider?.logo && (
              <img 
                src={selectedProvider.logo} 
                alt={selectedProvider.name}
                className="w-40 h-auto object-contain mb-16"
              />
            )}
            <p className="text-sm font-regular text-[rgb(var(--color-neutral))]">Retrieving Data...</p>
          </div>
        );
      
      case 'details':
        return formFields ? (
          <DynamicForm
            fields={formFields}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <div>Loading form...</div>
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
      showCloseButton={true}
      closeOnOverlayClick={true}
      title={formFields ? `${selectedProvider?.name} Purchase Form` : ''}
    >
      {renderContent()}
    </Modal>
  );
};

export default ProviderModal;
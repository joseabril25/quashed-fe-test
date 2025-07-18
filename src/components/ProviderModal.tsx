import React from 'react';
import { closeModal, setCurrentStep, saveDetailsForm, savePaymentForm } from '../store/slices/providersSlice';
import Modal from './Modal';
import DynamicForm from './DynamicForm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { paymentFormFields } from '../constants/paymentFormFields';
import { Button } from './ui/Button';

const ProviderModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modalOpen, selectedProvider, currentStep, formFields, formData } = useAppSelector((state) => state.providers);

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

  const handlePaymentSubmit = (data: Record<string, any>) => {
    dispatch(savePaymentForm(data));
    dispatch(setCurrentStep('confirmation'));
  };

  const handleBackToDashboard = () => {
    dispatch(closeModal());
    // Navigate back to dashboard logic can be added here
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
            step={currentStep}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <div>Loading form...</div>
        );
      
      case 'payment':
        return (
          <DynamicForm
            fields={paymentFormFields}
            step={currentStep}
            onSubmit={handlePaymentSubmit}
            onCancel={handleFormCancel}
          />
        );
      
      case 'confirmation':
        return (
          <div className='flex flex-col justify-between h-[80vh]'>
            <div>
              <p className='mb-4'>Your contract starts from {formData?.details?.startDate}</p>
              <p>{selectedProvider?.name} specialists will contact you with further steps.</p>
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="submit"
                variant="primary"
                showArrow={true}
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (currentStep) {
      case 'details':
        return `${selectedProvider?.name} Purchase Form`;
      default:
        return `${selectedProvider?.name} Purchase`;
    }
  };

  return (
    <Modal 
      isOpen={modalOpen} 
      onClose={handleClose}
      showCloseButton={true}
      closeOnOverlayClick={true}
      title={formFields ? getModalTitle() : ''}
    >
      {renderContent()}
    </Modal>
  );
};

export default ProviderModal;
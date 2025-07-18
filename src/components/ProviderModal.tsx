import { closeModal, setCurrentStep, setDetailsForm, setPaymentForm } from '../store/slices/providersSlice';
import { Modal } from './Modal';
import DynamicForm from './DynamicForm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { paymentFormFields } from '../constants/paymentFormFields';
import { Button } from './ui/Button';
import { usePostSubmitProviderMutation } from '../store/api/providersApi';
import type { ProviderDetailsForm, PaymentForm } from '../types/apiTypes';
import { formatDate } from '../utils/dateUtils';
import { openFeedbackModal } from '../store/slices/feedbackSlice';

export const ProviderModal = () => {
  const dispatch = useAppDispatch();
  const { modalOpen, selectedProvider, currentStep, formFields, detailsForm } = useAppSelector((state) => state.providers);
  const [postSubmitProvider, { isLoading }] = usePostSubmitProviderMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleFormSubmit = (data: Record<string, unknown>) => {
    dispatch(setDetailsForm(data as ProviderDetailsForm));
    dispatch(setCurrentStep('payment'));
  };

  const handleFormCancel = () => {
    dispatch(closeModal());
  };

  const handlePaymentSubmit = async (data: Record<string, unknown>) => {
    const paymentData = data as PaymentForm;
    dispatch(setPaymentForm(paymentData));
    
    // Submit the complete form data to the API
    if (selectedProvider && detailsForm && paymentData) {
      await postSubmitProvider({
        providerId: selectedProvider.id || '',
        details: detailsForm,
        payment: paymentData
      });
    }
  };

  const handleBackToDashboard = () => {
    dispatch(closeModal());
    // Open feedback modal after closing provider modal
    setTimeout(() => {
      dispatch(openFeedbackModal());
    }, 300); // Small delay to ensure smooth transition
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'connecting':
        return (
          <div className="flex flex-col items-center justify-center h-[80vh]">
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
          <div className="flex flex-col items-center justify-center h-[80vh]">
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
            key="details-form"
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
            key="payment-form"
            fields={paymentFormFields}
            step={currentStep}
            onSubmit={handlePaymentSubmit}
            onCancel={handleFormCancel}
            isLoading={isLoading}
          />
        );
      
      case 'confirmation':
        return (
          <div className='flex flex-col justify-between h-[80vh]'>
            <div>
              <p className='mb-4'>Your contract starts from {formatDate(detailsForm?.contractStartDate)}</p>
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
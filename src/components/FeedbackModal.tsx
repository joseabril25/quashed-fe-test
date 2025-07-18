import { createPortal } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from './ui/Button';
import { TextAarea } from './ui/TextArea';
import { IconClose } from './Icons/icon-close';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeFeedbackModal } from '../store/slices/feedbackSlice';
import { useSubmitFeedbackMutation } from '../store/api/feedbackApi';

interface FeedbackFormData {
  message: string;
}

const feedbackSchema = yup.object({
  message: yup
    .string()
    .trim()
    .required('Please enter your feedback')
    .min(10, 'Feedback must be at least 10 characters')
    .max(500, 'Feedback must not exceed 500 characters')
});

export const FeedbackModal = () => {
  const dispatch = useAppDispatch();
  const { modalOpen } = useAppSelector((state) => state.feedback);
  const [submitFeedback, { isLoading }] = useSubmitFeedbackMutation();

  const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FeedbackFormData>({
    resolver: yupResolver(feedbackSchema),
    mode: 'onChange',
    defaultValues: {
      message: ''
    }
  });

  const onSubmit = async (data: FeedbackFormData) => {
    await submitFeedback({ message: data.message });
    reset();
  };

  const handleCancel = () => {
    reset();
    dispatch(closeFeedbackModal());
  };

  if (!modalOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,24,31,0.25)] animate-fadeIn">
      <div className="relative bg-white shadow-xl w-full max-w-[640px] max-h-[361px] p-8 animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h4>How did it go?</h4>
          <button
            onClick={handleCancel}
            className="transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <IconClose width={20} height={20} color='rgb(var(--color-mono))' />
          </button>
        </div>

        {/* Content */}
        <p className="mb-8">
          Please share with us your recent experience.
        </p>

        {/* Textarea */}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextAarea
                label=""
                value={field.value}
                onChange={field.onChange}
                placeholder="Message"
                rows={5}
                error={!!errors.message}
                errorMessage={errors.message?.message}
              />
            )}
          />
        </form>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="tertiary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

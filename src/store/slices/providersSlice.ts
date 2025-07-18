import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Provider, FormField, ProviderDetailsForm, PaymentForm } from "../../types/apiTypes";
import { providersApi } from "../api/providersApi";

export type ModalStep = 'connecting' | 'retrieving' | 'details' | 'payment' | 'confirmation';

// Async thunk to handle the provider selection flow
export const selectProviderAndLoadData = createAsyncThunk(
  'providers/selectProviderAndLoadData',
  async (provider: Provider, { dispatch }) => {
    // Step 1: Open modal and set to connecting
    dispatch(openModalWithProviderId(provider));
    
    // Step 2: CONNECTING - Establish OAuth/API connection with provider
    console.log('CONNECTING: Establishing OAuth/API connection...');
    const connectionResult = await dispatch(
      providersApi.endpoints.postConnectProvider.initiate(
        { providerId: provider.id || '' }
      )
    ).unwrap();

    dispatch(setCurrentStep('retrieving'));
    dispatch(setSelectedProvider(connectionResult.provider));
    
    // Step 3: RETRIEVING - Get form fields and user data
    console.log('RETRIEVING: Fetching form configuration...');
    // TODO: In real scenario, this would also pull user eligibility, existing account data, etc.
    const formFieldsResult = await dispatch(
      providersApi.endpoints.getProviderFormFields.initiate(provider.id || '', { forceRefetch: true })
    ).unwrap();
    
    // Step 4: Ready for form submission
    dispatch(setCurrentStep('details'));
    dispatch(setFormFields(formFieldsResult));
    
    return { provider: connectionResult.provider, formFields: formFieldsResult };
  }
);

interface ProvidersState {
  providers: Provider[] | null;
  selectedProvider: Provider | null;
  modalOpen: boolean;
  currentStep: ModalStep;
  formFields: FormField[] | null;
  detailsForm: ProviderDetailsForm | null;
  paymentForm: PaymentForm | null;
}

const initialState: ProvidersState = {
  providers: null,
  selectedProvider: null,
  modalOpen: false,
  currentStep: 'connecting',
  formFields: null,
  detailsForm: null,
  paymentForm: null
}

const providerSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    setProviders: (
      state,
      { payload: { providers } }: PayloadAction<{ providers: Provider[] }>
    ) => {
      state.providers = providers
    },
    clearProviders: (state) => {
      state.providers = null
    },
    openModalWithProviderId: (state, action: PayloadAction<Provider>) => {
      state.modalOpen = true;
      state.currentStep = 'connecting';
      state.detailsForm = null;
      state.paymentForm = null;
      state.formFields = null;
      // Store a temporary provider with just the ID
      state.selectedProvider = action.payload;
    },
    setSelectedProvider: (state, action: PayloadAction<Provider>) => {
      state.selectedProvider = action.payload;
    },
    setFormFields: (state, action: PayloadAction<FormField[]>) => {
      state.formFields = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.selectedProvider = null;
      state.currentStep = 'connecting';
      state.detailsForm = null;
      state.paymentForm = null;
      state.formFields = null;
    },
    setCurrentStep: (state, action: PayloadAction<ModalStep>) => {
      state.currentStep = action.payload;
    },
    setDetailsForm: (state, action: PayloadAction<ProviderDetailsForm>) => {
      state.detailsForm = action.payload;
    },
    setPaymentForm: (state, action: PayloadAction<PaymentForm>) => {
      state.paymentForm = action.payload;
    },
  }
})

export const {
  setProviders,
  clearProviders,
  openModalWithProviderId,
  setSelectedProvider,
  setFormFields,
  closeModal,
  setCurrentStep,
  setDetailsForm,
  setPaymentForm,
} = providerSlice.actions

export const providerReducer = providerSlice.reducer
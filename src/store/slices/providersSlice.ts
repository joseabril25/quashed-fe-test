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
    
    // Call getProvider API with forceRefetch to bypass cache
    const providerResult = await dispatch(
      providersApi.endpoints.getProvider.initiate(provider.id || '', { forceRefetch: true })
    ).unwrap();

    dispatch(setCurrentStep('retrieving'));
    dispatch(setSelectedProvider(providerResult));
    
    // Call getProviderFormFields API with forceRefetch to bypass cache
    const formFieldsResult = await dispatch(
      providersApi.endpoints.getProviderFormFields.initiate(provider.id || '', { forceRefetch: true })
    ).unwrap();
    
    // Save form fields
    dispatch(setCurrentStep('details'));
    dispatch(setFormFields(formFieldsResult));
    
    return { provider: providerResult, formFields: formFieldsResult };
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
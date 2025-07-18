import { http, HttpResponse, delay } from 'msw';
import { mockProviders, mockFormFields } from '../../mock/mock';
import type { ProviderPurchaseRequest } from '../../types/apiTypes';

export const providersHandlers = [
  // GET /api/providers - Get all providers
  http.get('/api/providers', async () => {
    try {
      console.log('🔧 MSW: GET /api/providers called');
      await delay(800);
      
      // TODO: Replace with actual database service call
      // const providers = await ProviderService.getAll();
      
      console.log('🔧 MSW: Returning providers data:', mockProviders);
      return HttpResponse.json(mockProviders);
    } catch (error) {
      console.error('❌ MSW: Error fetching providers:', error);
      return HttpResponse.json(
        { error: 'Failed to fetch providers' },
        { status: 500 }
      );
    }
  }),

  // GET /api/providers/:id - Get provider by ID
  http.get('/api/providers/:id', async ({ params }) => {
    try {
      await delay(800);
      const { id } = params;
      
      // TODO: Replace with actual database service call
      // const provider = await ProviderService.getById(id);
      
      const provider = mockProviders.find(p => p.id === id);
      
      if (!provider) {
        return HttpResponse.json(
          { error: 'Provider not found' },
          { status: 404 }
        );
      }
      
      return HttpResponse.json(provider);
    } catch (error) {
      console.error('❌ MSW: Error fetching provider:', error);
      return HttpResponse.json(
        { error: 'Failed to fetch provider' },
        { status: 500 }
      );
    }
  }),

  // POST /api/providers/:id/connect - Connect to provider (OAuth simulation)
  http.post('/api/providers/:id/connect', async ({ params }) => {
    try {
      await delay(800);
      const { id } = params;
      
      // TODO: Replace with actual database service call
      // const provider = await ProviderService.getById(id);
      
      const provider = mockProviders.find(p => p.id === id);
      
      if (!provider) {
        return HttpResponse.json(
          { error: 'Provider not found' },
          { status: 404 }
        );
      }

      console.log(`🔌 MSW: Connecting to provider ${provider.name}...`);
      
      // TODO: Replace with actual OAuth service integration
      // const authResult = await OAuthService.initiateConnection(provider.id);
      // const connectionResult = await ProviderConnectionService.create({
      //   providerId: provider.id,
      //   userId: currentUser.id,
      //   status: 'connected'
      // });
      
      return HttpResponse.json({
        success: true,
        provider,
        message: `Successfully connected to ${provider.name}`,
        authUrl: `https://api.${provider.name.toLowerCase()}.com/oauth/authorize?client_id=123&redirect_uri=...`
      }, { status: 201 });
    } catch (error) {
      console.error('❌ MSW: Error connecting to provider:', error);
      return HttpResponse.json(
        { error: 'Failed to connect to provider' },
        { status: 500 }
      );
    }
  }),

  // GET /api/providers/:id/form-fields - Get form fields for provider
  http.get('/api/providers/:id/form-fields', async ({ params }) => {
    try {
      await delay(800);
      const { id } = params;
      
      // TODO: Replace with actual database service call
      // const fields = await FormFieldService.getByProvider(id);
      
      const fields = mockFormFields[id as string];
      
      if (!fields) {
        return HttpResponse.json(
          { error: 'Form fields not found for this provider' },
          { status: 404 }
        );
      }
      
      return HttpResponse.json(fields);
    } catch (error) {
      console.error('❌ MSW: Error fetching form fields:', error);
      return HttpResponse.json(
        { error: 'Failed to fetch form fields' },
        { status: 500 }
      );
    }
  }),

  // POST /api/providers/:id/purchase - Submit provider purchase
  http.post('/api/providers/:id/purchase', async ({ params, request }) => {
    try {
      await delay(800);
      const { id } = params;
      const body = await request.json() as ProviderPurchaseRequest;
      
      // Validate request body
      if (!body.details || !body.payment) {
        return HttpResponse.json(
          { error: 'Missing required fields: details and payment' },
          { status: 400 }
        );
      }
      
      console.log(`💳 MSW: Submitting purchase for provider ${id}`, body);
      
      // TODO: Replace with actual service calls
      // const provider = await ProviderService.getById(id);
      // const paymentResult = await PaymentService.processPayment(body.payment);
      // const order = await OrderService.create({
      //   providerId: id,
      //   userId: currentUser.id,
      //   details: body.details,
      //   paymentId: paymentResult.id,
      //   status: 'completed'
      // });
      // await NotificationService.sendConfirmationEmail(order);
      
      return HttpResponse.json({
        message: 'Form submitted successfully',
        orderId: `ORDER-${Date.now()}`,
      }, { status: 201 });
    } catch (error) {
      console.error('❌ MSW: Error processing purchase:', error);
      return HttpResponse.json(
        { error: 'Failed to process purchase' },
        { status: 500 }
      );
    }
  }),
];
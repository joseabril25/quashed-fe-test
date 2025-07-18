import { http, HttpResponse, delay } from 'msw';
import { mockProviders, mockFormFields, mockUser } from '../../mock/mock';
import type { 
  ProviderPurchaseRequest, 
  UserAccountData 
} from '../../types/apiTypes';

export const providersHandlers = [
  // GET /api/providers - Get all providers
  http.get('/api/providers', async () => {
    console.log('🔧 MSW: GET /api/providers called');
    await delay(800);
    console.log('🔧 MSW: Returning providers data:', mockProviders);
    return HttpResponse.json(mockProviders);
  }),

  // GET /api/providers/:id - Get provider by ID
  http.get('/api/providers/:id', async ({ params }) => {
    await delay(800);
    const { id } = params;
    const provider = mockProviders.find(p => p.id === id);
    
    if (!provider) {
      return HttpResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(provider);
  }),

  // POST /api/providers/:id/connect - Connect to provider (OAuth simulation)
  http.post('/api/providers/:id/connect', async ({ params }) => {
    await delay(800);
    const { id } = params;
    const provider = mockProviders.find(p => p.id === id);
    
    if (!provider) {
      return HttpResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    console.log(`🔌 MSW: Connecting to provider ${provider.name}...`);
    
    return HttpResponse.json({
      success: true,
      provider,
      message: `Successfully connected to ${provider.name}`,
      authUrl: `https://api.${provider.name.toLowerCase()}.com/oauth/authorize?client_id=123&redirect_uri=...`
    });
  }),

  // GET /api/providers/:id/account - Get user account data
  http.get('/api/providers/:id/account', async ({ params }) => {
    await delay(800);
    const { id } = params;
    const provider = mockProviders.find(p => p.id === id);
    
    console.log(`📡 MSW: Retrieving user account data for ${provider?.name}...`);
    
    const accountData: UserAccountData = {
      user: mockUser,
      eligiblePlans: [
        { id: '10gb', name: '10GB Plan', price: 25.99, recommended: true },
        { id: '20gb', name: '20GB Plan', price: 39.99 },
        { id: '30gb', name: '30GB Plan', price: 49.99 }
      ],
      currentProvider: 'Spark',
      existingAddress: '123 Main Street, Auckland, New Zealand',
      hasActiveService: true
    };
    
    return HttpResponse.json(accountData);
  }),

  // GET /api/providers/:id/form-fields - Get form fields for provider
  http.get('/api/providers/:id/form-fields', async ({ params }) => {
    await delay(800);
    const { id } = params;
    const fields = mockFormFields[id as string];
    
    if (!fields) {
      return HttpResponse.json(
        { error: 'Form fields not found for this provider' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(fields);
  }),

  // POST /api/providers/:id/purchase - Submit provider purchase
  http.post('/api/providers/:id/purchase', async ({ params, request }) => {
    await delay(800);
    const { id } = params;
    const body = await request.json() as ProviderPurchaseRequest;
    
    console.log(`💳 MSW: Submitting purchase for provider ${id}`, body);
    
    return HttpResponse.json({
      message: 'Form submitted successfully',
      orderId: `ORDER-${Date.now()}`,
    });
  }),
];
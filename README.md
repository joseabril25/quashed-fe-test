# Provider Purchase Flow Demo

A comprehensive React application demonstrating a provider selection and purchase flow with dynamic forms, real-time validation, and mock API integration.

## 🚀 Features

- **Dynamic Provider Selection**: Interactive table with provider cards showing pricing and features
- **Multi-step Modal Flow**: 
  - Provider connection (OAuth simulation)
  - Dynamic form generation based on provider requirements
  - Payment processing with validation
  - Purchase confirmation
- **Real-time Form Validation**: Using React Hook Form with Yup schemas
- **Mock API Integration**: MSW (Mock Service Worker) for realistic API behavior
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **Type Safety**: Full TypeScript implementation with strict typing
- **State Management**: Redux Toolkit with RTK Query for API calls
- **User Feedback System**: Post-purchase feedback modal with form validation

## 🛠 Tech Stack

### Core Technologies
- **React 19.1.0** - Latest React with modern features
- **TypeScript 5.8.3** - Type safety and better developer experience
- **Vite 7.0.4** - Fast development server and build tool
- **Tailwind CSS 4.1.11** - Utility-first CSS framework

### State Management & API
- **Redux Toolkit 2.8.2** - Modern Redux with RTK Query
- **RTK Query** - Data fetching and caching
- **React Redux 9.2.0** - React bindings for Redux

### Forms & Validation
- **React Hook Form 7.60.0** - Performant forms with easy validation
- **Yup 1.6.1** - Schema validation
- **@hookform/resolvers 5.1.1** - Yup integration with React Hook Form

### Date Handling
- **React DatePicker 8.4.0** - Date picker component
- **Custom Date Utils** - Timestamp handling and formatting

### API Mocking
- **MSW 2.10.4** - Mock Service Worker for realistic API behavior
- **Organized Handlers** - Domain-specific API handlers (providers, users, feedback)

### Development Tools
- **ESLint 9.30.1** - Code linting with TypeScript rules
- **TypeScript ESLint 8.35.1** - TypeScript-specific linting rules
- **Vite React Plugin 4.6.0** - React support for Vite

## 📦 Installation

```bash
# Clone the repository
git clone <[repository-url](https://github.com/joseabril25/quashed-fe-test.git)>
cd quashed-test

# Install dependencies
yarn install

# Initialize MSW (if not already done)
yarn msw init public/
```

## 🚦 Running the Application

### Development Server
```bash
# Start development server
yarn dev

# Server will run on http://localhost:5173
```

### Build for Production
```bash
# Build the application
yarn build

# Preview production build
yarn preview
```

### Linting
```bash
# Run ESLint
yarn lint
```

## 🏗 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Input, etc.)
│   ├── DynamicForm.tsx  # Generic form component
│   ├── ProviderModal.tsx # Main purchase flow modal
│   └── ProviderTable.tsx # Provider selection table
├── store/               # Redux store configuration
│   ├── api/            # RTK Query API definitions
│   ├── slices/         # Redux slices
│   └── store.ts        # Store configuration
├── mocks/              # MSW mock API handlers
│   └── handlers/       # Domain-specific handlers
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # Application constants
└── styles.css          # Global styles
```

## 🔄 Application Flow

### 1. Provider Selection
- Users browse available providers in a responsive table
- Each provider shows pricing, features, and ratings
- Click to initiate purchase flow

### 2. Connection Phase
- Simulates OAuth/API connection with the provider
- Shows loading state with provider branding
- Transitions to data retrieval phase

### 3. Dynamic Form Generation
- Forms are generated based on provider requirements
- Real-time validation with custom error messages
- Support for various field types (text, select, date, checkbox, etc.)
- Responsive layout with smart field grouping

### 4. Payment Processing
- Secure payment form with card validation
- Real-time form validation
- Simulated payment processing

### 5. Confirmation & Feedback
- Purchase confirmation with contract details
- Post-purchase feedback modal
- Return to dashboard flow

## 🎯 Key Features in Detail

### Dynamic Form System
- **Generic Form Component**: Supports multiple field types
- **Yup Schema Generation**: Dynamic validation based on field configuration
- **Smart Layout**: Automatic field grouping and responsive design
- **Type Safety**: Full TypeScript support with proper form typing

### Mock API Integration
- **MSW Implementation**: Realistic API behavior without backend
- **Domain Organization**: Separate handlers for providers, users, feedback
- **Realistic Delays**: Simulated network latency
- **Error Handling**: Proper error responses and edge cases

### State Management
- **Redux Toolkit**: Modern Redux with simplified syntax
- **RTK Query**: Efficient data fetching and caching
- **Proper Typing**: Full TypeScript integration
- **Normalized State**: Efficient state structure

### Date Handling
- **Timestamp-based**: All dates stored as Unix timestamps
- **Utility Functions**: Centralized date formatting and validation
- **Locale Support**: Internationalization-ready date formatting

## 🔧 Configuration

### Environment Variables
```bash
# Add to .env.local if needed
NODE_ENV=development
```

### MSW Configuration
MSW is configured to intercept API calls and return mock data:
- Handlers are organized by domain (providers, users, feedback)
- Realistic delays simulate network conditions
- Console logging for debugging API calls

## 📱 Responsive Design

- **Mobile-first approach** with Tailwind CSS
- **Breakpoint strategy**: sm, md, lg, xl breakpoints
- **Flexible layouts**: Forms adapt to screen size
- **Touch-friendly**: Proper spacing and touch targets

## 🧪 Testing Strategy

The application is structured for easy testing:
- **Pure components** for UI testing
- **MSW integration** for API testing
- **Redux testing** with proper store mocking
- **Form validation** testing with various scenarios

## 🚀 Performance Optimizations

- **Code splitting** ready with Vite
- **Lazy loading** for components
- **Memoization** for expensive calculations
- **Efficient re-renders** with proper React patterns

## 🔮 Future Enhancements

- **Real API integration** (replace MSW handlers)
- **Authentication system** (JWT tokens, OAuth)
- **Error boundary** implementation
- **Loading states** optimization
- **Testing suite** (Jest, React Testing Library, Cypress)

## 📄 License

This project is for demonstration purposes.
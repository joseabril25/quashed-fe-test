import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Layout } from './Layout.tsx'

import './styles.css'
import 'react-datepicker/dist/react-datepicker.css'

// Start MSW
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  console.log('🔧 MSW: Starting Mock Service Worker...')
  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: 'warn',
  }).then(() => {
    console.log('✅ MSW: Service Worker started successfully')
  }).catch((error) => {
    console.error('❌ MSW: Failed to start service worker:', error)
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <Layout>
          <App />
        </Layout>
      </Provider>
    </StrictMode>,
  )
})

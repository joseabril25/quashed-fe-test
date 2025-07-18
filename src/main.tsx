import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Layout } from './Layout.tsx'

import './styles.css'
import 'react-datepicker/dist/react-datepicker.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/theme.css'
import AppRoutes from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from './components/ui/theme-provider'
import { Toaster } from './components/ui/sonner'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />

        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />

      </ThemeProvider>
      
    </QueryClientProvider>

  </StrictMode>,
)

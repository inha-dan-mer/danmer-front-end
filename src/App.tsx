import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

import PageLayout from '@/components/PageLayout';

const MainPage = React.lazy(() => import('@/pages/main'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <PageLayout>
            <Routes>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </PageLayout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

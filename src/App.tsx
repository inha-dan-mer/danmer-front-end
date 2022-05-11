import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

import PageLayout from '@/components/PageLayout';

const MainPage = React.lazy(() => import('@/pages/main'));
const UploadVideoPage = React.lazy(() => import('@/pages/uploadVideo'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <PageLayout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/video/upload" element={<UploadVideoPage />} />
            </Routes>
          </PageLayout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

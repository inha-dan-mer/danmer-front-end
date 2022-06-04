import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import theme from '@/styles/theme';
import { URL_VALUE } from '@/utils/constants';

import PageLayout from '@/components/PageLayout';

const LoginPage = React.lazy(() => import('@/pages/signin'));
const SignUpPage = React.lazy(() => import('@/pages/signUp'));

const MainPage = React.lazy(() => import('@/pages/main'));
const UploadVideoPage = React.lazy(() => import('@/pages/uploadVideo'));
const VideoDetailPage = React.lazy(() => import('@/pages/videoDetail'));
const RecordDancingPage = React.lazy(() => import('@/pages/recordDancing'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <PageLayout>
            <Routes>
              <Route path={URL_VALUE.signIn} element={<LoginPage />} />
              <Route path={URL_VALUE.signUp} element={<SignUpPage />} />

              <Route path={URL_VALUE.main} element={<MainPage />} />
              <Route path={URL_VALUE.videoUpload} element={<UploadVideoPage />} />
              <Route path={URL_VALUE.videoDetail} element={<VideoDetailPage />} />
              <Route path={URL_VALUE.recordDancing} element={<RecordDancingPage />} />
            </Routes>
          </PageLayout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

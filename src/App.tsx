import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import theme from '@/styles/theme';
import { URL_VALUE } from '@/utils/constants';

import PageLayout from '@/components/PageLayout';
import AuthCheck from '@/components/AuthCheck';

const LoginPage = React.lazy(() => import('@/pages/signin'));
const SignUpPage = React.lazy(() => import('@/pages/signUp'));

const MainPage = React.lazy(() => import('@/pages/main'));
const UploadVideoPage = React.lazy(() => import('@/pages/uploadVideo'));
const VideoDetailPage = React.lazy(() => import('@/pages/videoDetail'));
const RecordDancingPage = React.lazy(() => import('@/pages/recordDancing'));
const MyProfilePage = React.lazy(() => import('@/pages/myProfile'));
const FeedbackPage = React.lazy(() => import('@/pages/feedback'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthCheck>
            <PageLayout>
              <Routes>
                <Route path={URL_VALUE.signIn} element={<LoginPage />} />
                <Route path={URL_VALUE.signUp} element={<SignUpPage />} />

                <Route path={URL_VALUE.main} element={<MainPage />} />
                <Route path={URL_VALUE.videoUpload} element={<UploadVideoPage />} />
                <Route path={URL_VALUE.videoDetail} element={<VideoDetailPage />} />
                <Route path={URL_VALUE.recordDancing} element={<RecordDancingPage />} />
                <Route path={URL_VALUE.me} element={<MyProfilePage />} />
                <Route path={URL_VALUE.feedback} element={<FeedbackPage />} />
              </Routes>
            </PageLayout>
          </AuthCheck>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

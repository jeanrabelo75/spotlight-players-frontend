import React from 'react';
import { AuthProvider } from '@/contexts/auth';
import { MessageProvider } from '@/contexts/message';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MessageProvider>
        <Component {...pageProps} />
      </MessageProvider>
    </AuthProvider>
  );
}

export default MyApp;

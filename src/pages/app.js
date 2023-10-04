import React from 'react';
import { AuthProvider } from '@/contexts/auth';

function MyApp({ Component, pageProps }) {
  console.log(useAuth());

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

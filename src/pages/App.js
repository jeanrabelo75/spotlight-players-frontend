import React from "react";
import { AuthProvider } from "@/contexts/Auth";

function MyApp({ Component, pageProps }) {
  console.log(useAuth());

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

import React from "react";
import { SessionProvider } from "next-auth/react";
import { MessageProvider } from "@/contexts/message";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <MessageProvider>
        <Component {...pageProps} />
      </MessageProvider>
    </SessionProvider>
  );
}

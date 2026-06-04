"use client";

import Script from "next/script";

declare global {
  interface Window {
    netlifyIdentity?: {
      on: (
        event: "init" | "login" | "logout",
        callback: (user?: unknown) => void,
      ) => void;
      open: () => void;
    };
  }
}

export function NetlifyIdentity() {
  return (
    <Script
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        const identity = window.netlifyIdentity;
        if (!identity) return;

        identity.on("init", (user) => {
          if (!user) {
            identity.on("login", () => {
              window.location.href = "/admin/";
            });
          }
        });
      }}
    />
  );
}

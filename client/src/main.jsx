import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import router from "./components/route/router";
import AuthProvider from "./components/auth/AuthProvider";
import "./index.css";

// Configure React Query defaults.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element "#root" was not found in index.html.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

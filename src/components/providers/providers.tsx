"use client";
import { getQueryClient } from "@/components/providers/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type * as React from "react";
import { Suspense } from "react";
import { SidebarProvider } from "../ui/sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Suspense>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Suspense>
      </SidebarProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

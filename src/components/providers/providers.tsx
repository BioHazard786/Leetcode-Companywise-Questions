"use client";
import { getQueryClient } from "@/components/providers/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type * as React from "react";
import { SidebarProvider } from "../ui/sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </SidebarProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

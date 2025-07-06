"use client";

import { filterSearchParams } from "@/app/search-params";
import { TableFilters } from "@/lib/types";
import { getProblems } from "@/server/action";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";

export function useProblems() {
  const [{ search, companies, topics, difficulty }] =
    useQueryStates(filterSearchParams);

  const filters: TableFilters = {
    limit: 50,
    search: search || undefined,
    companies: companies || undefined,
    topics: topics || undefined,
    difficulty: difficulty || undefined,
  };

  return useInfiniteQuery({
    queryKey: ["problems", search, companies, topics, difficulty],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getProblems({ ...filters, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

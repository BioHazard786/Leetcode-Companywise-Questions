import { loadSearchParams } from "@/app/search-params";
import { DataTable } from "@/components/problems/data-table";
import { getProblems } from "@/server/action";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const { search, companies, topics, difficulty } = await loadSearchParams(
    searchParams
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["problems", search, companies, topics, difficulty],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getProblems({
        search,
        companies: companies || undefined,
        topics: topics || undefined,
        difficulty: difficulty || undefined,
        cursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTable />
    </HydrationBoundary>
  );
}

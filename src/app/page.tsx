import { loadSearchParams } from "@/app/search-params";
import { DataTable } from "@/components/problems/data-table";
import { getProblems } from "@/server/action";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { search, companies, topics, difficulty } = await loadSearchParams(
    searchParams
  );

  let title = "LeetCode Company-wise Questions";
  let description =
    "Explore and filter LeetCode problems categorized by companies like Google, Microsoft, Amazon, and more.";

  // Customize title and description based on filters
  const titleParts = [];
  if (companies && companies.length > 0) {
    titleParts.push(`${companies.join(", ")} Problems`);
  }
  if (difficulty && difficulty.length > 0) {
    titleParts.push(`${difficulty.join(", ")} Difficulty`);
  }
  if (topics && topics.length > 0) {
    titleParts.push(`${topics.slice(0, 2).join(", ")} Topics`);
  }
  if (search) {
    titleParts.push(`"${search}"`);
  }

  if (titleParts.length > 0) {
    title = `${titleParts.join(" • ")} | LeetCode Practice`;
    description = `Find LeetCode problems${
      companies ? ` from ${companies.join(", ")}` : ""
    }${difficulty ? ` with ${difficulty.join(", ")} difficulty` : ""}${
      topics ? ` covering ${topics.join(", ")}` : ""
    }${
      search ? ` matching "${search}"` : ""
    }. Practice coding interviews with curated problem sets.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

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

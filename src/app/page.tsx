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
    "Explore and filter LeetCode problems categorized by companies like Google, Microsoft, Amazon and more.";

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

  // Build URL with current search params for accurate social sharing
  const urlSearchParams = new URLSearchParams();
  if (search) urlSearchParams.set('search', search);
  if (companies && companies.length > 0) {
    companies.forEach(company => urlSearchParams.append('companies', company));
  }
  if (topics && topics.length > 0) {
    topics.forEach(topic => urlSearchParams.append('topics', topic));
  }
  if (difficulty && difficulty.length > 0) {
    difficulty.forEach(diff => urlSearchParams.append('difficulty', diff));
  }
  
  const currentUrl = urlSearchParams.toString() ? `/?${urlSearchParams.toString()}` : '/';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: "LeetCode Company-wise Questions",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@leetcode_practice",
      creator: "@BioHazard786",
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

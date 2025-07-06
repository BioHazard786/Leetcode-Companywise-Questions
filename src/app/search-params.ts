import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const filterSearchParams = {
  search: parseAsString.withDefault(""),
  companies: parseAsArrayOf(parseAsString),
  topics: parseAsArrayOf(parseAsString),
  difficulty: parseAsArrayOf(parseAsString),
};

export const loadSearchParams = createLoader(filterSearchParams);

export interface TableFilters {
  companies?: string[];
  difficulty?: string[];
  topics?: string[];
  search?: string;
  limit?: number;
  cursor?: string;
}

export interface Company {
  name: string;
  frequency: number;
}

export interface Problem {
  id: number;
  problem_title: string;
  difficulty: string;
  acceptance_rate: string | null;
  link: string | null;
  topics: string[];
  companies: Company[];
}

export interface ProblemsResponse {
  data: Problem[];
  nextCursor: string | null;
  hasNextPage: boolean;
}

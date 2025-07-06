"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Problem } from "@/lib/types";
import { getRandomColor } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Leetcode from "../ui/leetcode-icon";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "green";
    case "medium":
      return "yellow";
    case "hard":
      return "red";
    default:
      return "gray";
  }
};

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "problem_title",
    header: "Problem",
    cell: ({ row }) => {
      const problem = row.original;
      return <div className="font-medium text-sm">{problem.problem_title}</div>;
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;
      return (
        <Badge
          color={getDifficultyColor(difficulty)}
          variant="secondary"
          className="rounded-sm"
        >
          {difficulty}
        </Badge>
      );
    },
  },
  {
    accessorKey: "acceptance_rate",
    header: "Acceptance",
    cell: ({ row }) => {
      const rate = row.getValue("acceptance_rate") as string | null;
      return rate ? `${parseFloat(rate).toFixed(2)}%` : "-";
    },
  },
  {
    accessorKey: "companies",
    header: "Companies",
    cell: ({ row }) => {
      const companies = row.getValue("companies") as Problem["companies"];
      const displayCount = 3;
      const displayCompanies = companies.slice(0, displayCount);
      const remainingCount = companies.length - displayCount;

      return (
        <div className="flex flex-wrap gap-1">
          {displayCompanies.map((company, index) => (
            <Badge
              key={index}
              variant="surface"
              className="text-xs rounded-sm"
              color={getRandomColor(company.name)}
            >
              {company.name}
              <span className="ml-1 text-xs font-normal opacity-80">
                ({company.frequency}%)
              </span>
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="surface" className="text-xs rounded-sm">
              +{remainingCount} more
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "topics",
    header: "Topics",
    cell: ({ row }) => {
      const topics = row.getValue("topics") as string[];
      const displayCount = 2;
      const displayTopics = topics.slice(0, displayCount);
      const remainingCount = topics.length - displayCount;

      return (
        <div className="flex flex-wrap gap-1">
          {displayTopics.map((topic, index) => (
            <Badge
              key={index}
              variant="secondary"
              color={getRandomColor(topic)}
              className="text-xs rounded-sm"
            >
              {topic}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondary" className="text-xs rounded-sm">
              +{remainingCount}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const problem = row.original;

      return (
        <Button variant="link" size="icon">
          <Link
            href={problem.link || ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Leetcode className="size-5" />
          </Link>
        </Button>
      );
    },
  },
];

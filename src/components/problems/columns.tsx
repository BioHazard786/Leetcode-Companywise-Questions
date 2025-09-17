"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Problem } from "@/lib/types";
import { getAcceptanceColor, getRandomColor, getDifficultyColor } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";


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
      let acceptanceRate = row.getValue("acceptance_rate") as string | null;
      if (acceptanceRate) {
        const rateNum = parseFloat(acceptanceRate);
        acceptanceRate = rateNum % 1 === 0 ? `${rateNum}%` : `${rateNum.toFixed(2)}%`;
      } else {
        acceptanceRate = "-";
      }
      return <Badge
          color={getAcceptanceColor(acceptanceRate)}
          variant="surface"
          className="rounded-sm"
        >
          {acceptanceRate}
        </Badge>;
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
        <div className="flex flex-wrap gap-2">
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
        <div className="flex flex-wrap gap-2">
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
            <Image src="/leetcode-dark.png" alt="LeetCode" width={16} height={16} className="dark:block hidden"/>
            <Image src="/leetcode-light.png" alt="LeetCode" width={16} height={16} className="dark:hidden"/>
          </Link>
        </Button>
      );
    },
  },
];

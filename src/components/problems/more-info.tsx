import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Problem } from "@/lib/types";
import { getRandomColor } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Leetcode from "../ui/leetcode-icon";
import { ScrollArea } from "../ui/scroll-area";

interface MoreInfoProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
}

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

const MoreInfo: React.FC<MoreInfoProps> = ({ problem, isOpen, onClose }) => {
  if (!problem) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-left">{problem.problem_title}</SheetTitle>
          <SheetDescription className="text-left">
            Problem #{problem.id} - Detailed Information
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="mt-6 space-y-6 p-4 pt-0">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Difficulty
                </h3>
                <Badge
                  color={getDifficultyColor(problem.difficulty)}
                  variant="secondary"
                  className="rounded-sm"
                >
                  {problem.difficulty}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Acceptance Rate
                </h3>
                <p className="text-sm">
                  {problem.acceptance_rate
                    ? `${parseFloat(problem.acceptance_rate).toFixed(2)}%`
                    : "Not available"}
                </p>
              </div>
            </div>

            {/* Companies */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Companies ({problem.companies.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {problem.companies.map((company, index) => (
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
              </div>
            </div>

            {/* Topics */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Topics ({problem.topics.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {problem.topics.map((topic, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    color={getRandomColor(topic)}
                    className="text-xs rounded-sm"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Link */}
            {problem.link && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  LeetCode Link
                </h3>
                <Button variant="outline" className="w-full" asChild>
                  <Link
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Leetcode className="size-4" />
                    Open in LeetCode
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MoreInfo;

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
import { getAcceptanceColor, getRandomColor, getDifficultyColor } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

interface MoreInfoProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
}


const MoreInfo: React.FC<MoreInfoProps> = ({ problem, isOpen, onClose }) => {
  if (!problem) return null;

  const getAcceptanceRate = (rate: string | null) => {
    if (!rate) return "Not available";
    const rateNum = parseFloat(rate);
    return rateNum % 1 === 0 ? `${rateNum}%` : `${rateNum.toFixed(2)}%`;
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="[&>button]:absolute [&>button]:-top-10 [&>button]:opacity-0 [&>button]:pointer-events-none">
        <SheetHeader>
          <SheetTitle className="text-left">{problem.problem_title}</SheetTitle>
          <SheetDescription className="text-left">
            Problem #{problem.id} - Detailed Information
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100dvh-140px)]">
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
                <Badge
                  color={getAcceptanceColor(problem.acceptance_rate)}
                  variant="surface"
                  className="rounded-sm"
                >
                  {getAcceptanceRate(problem.acceptance_rate)}
                </Badge>
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
                    <Image src="/leetcode-dark.png" alt="LeetCode" width={16} height={16} className="dark:block hidden"/>
                    <Image src="/leetcode-light.png" alt="LeetCode" width={16} height={16} className="dark:hidden"/>
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

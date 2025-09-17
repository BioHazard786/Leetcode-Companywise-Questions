"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { COMPANIES, TOPICS } from "@/lib/constants";
import { getRandomColor } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { Button } from "../ui/button";

const Filters = () => {
  const [selectedCompanies, setSelectedCompanies] = useQueryState(
    "companies",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [selectedTopics, setSelectedTopics] = useQueryState(
    "topics",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [selectedDifficulty, setSelectedDifficulty] = useQueryState(
    "difficulty",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const handleDifficultyChange = (value: string) => {
    if (selectedDifficulty.includes(value)) {
      setSelectedDifficulty(selectedDifficulty.filter((v) => v !== value));
    } else {
      setSelectedDifficulty([...selectedDifficulty, value]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCompanies([]);
    setSelectedTopics([]);
    setSelectedDifficulty([]);
  };

  return (
    <SidebarContent>
      <Accordion
        type="multiple"
        defaultValue={["companies"]}
        className="w-full p-3"
      >
        <AccordionItem value="companies">
          <AccordionTrigger className="text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:no-underline [&[data-state=open]]:text-sidebar-accent-foreground">
            Companies
          </AccordionTrigger>
          <AccordionContent>
            <SidebarGroupContent>
              <MultiSelect
                options={COMPANIES}
                selectedValues={selectedCompanies}
                setSelectedValues={setSelectedCompanies}
                searchPlaceholder="Search Companies..."
                selectedPlaceholder={
                  selectedCompanies.length > 1
                    ? `${selectedCompanies.length} Companies selected`
                    : "1 Company selected"
                }
                placeholder="Select Companies"
              />
              {selectedCompanies.length > 0 && (
                <div className="flex">
                  <ScrollArea className="mt-4 max-h-72 border-1 rounded-xl w-full">
                    <div className="flex flex-wrap gap-2 p-2 pr-3">
                      {selectedCompanies.map((company) => (
                        <Badge
                          color={getRandomColor(company)}
                          variant="surface"
                          className="text-sm rounded-md flex items-center p-1.5 [&>svg]:size-3.5 [&>svg]:pointer-events-auto"
                          key={company}
                        >
                          {company}
                          <XIcon
                            className="ml-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCompanies(
                                selectedCompanies.filter((c) => c !== company)
                              );
                            }}
                          />
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </SidebarGroupContent>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="topics">
          <AccordionTrigger className="text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:no-underline [&[data-state=open]]:text-sidebar-accent-foreground">
            Topics
          </AccordionTrigger>
          <AccordionContent>
            <SidebarGroupContent>
              <MultiSelect
                options={TOPICS}
                selectedValues={selectedTopics}
                setSelectedValues={setSelectedTopics}
                searchPlaceholder="Search Topics..."
                selectedPlaceholder={
                  selectedTopics.length > 1
                    ? `${selectedTopics.length} Topics selected`
                    : "1 Topic selected"
                }
                placeholder="Select Topics"
              />
              {selectedTopics.length > 0 && (
                <div className="flex">
                  <ScrollArea className="mt-4 max-h-72 border-1 rounded-lg w-full">
                    <div className="flex flex-wrap gap-2 p-2 pr-3">
                      {selectedTopics.map((topic) => (
                        <Badge
                          color={getRandomColor(topic)}
                          variant="surface"
                          className="text-sm rounded-sm flex items-center p-1.5 [&>svg]:size-3.5 [&>svg]:pointer-events-auto"
                          key={topic}
                        >
                          {topic}
                          <XIcon
                            className="ml-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTopics(
                                selectedTopics.filter((t) => t !== topic)
                              );
                            }}
                          />
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </SidebarGroupContent>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="difficulty">
          <AccordionTrigger className="text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:no-underline [&[data-state=open]]:text-sidebar-accent-foreground">
            Difficulty
          </AccordionTrigger>
          <AccordionContent>
            <SidebarGroupContent>
              <div className="border rounded-xl">
                <div className="flex items-center space-x-2 px-2 py-2.5 border-b">
                  <Checkbox
                    id="easy-checkbox"
                    checked={selectedDifficulty.some(
                      (value) => value === "EASY"
                    )}
                    onCheckedChange={() => handleDifficultyChange("EASY")}
                  />
                  <Label
                    htmlFor="easy-checkbox"
                    className="flex items-center justify-between max-w-24 w-full"
                  >
                    <span className="text-sm text-sidebar-accent-foreground/90">
                      Easy
                    </span>
                    <span className="size-2.5 rounded-[2px] bg-[var(--green-10)]" />
                  </Label>
                </div>
                <div className="flex items-center space-x-2 px-2 py-2.5 border-b">
                  <Checkbox
                    id="medium-checkbox"
                    checked={selectedDifficulty.some(
                      (value) => value === "MEDIUM"
                    )}
                    onCheckedChange={() => handleDifficultyChange("MEDIUM")}
                  />
                  <Label
                    htmlFor="medium-checkbox"
                    className="flex items-center justify-between max-w-24 w-full"
                  >
                    <span className="text-sm text-sidebar-accent-foreground/90">
                      Medium
                    </span>
                    <span className="ml-auto size-2.5 rounded-[2px] bg-[var(--yellow-10)]" />
                  </Label>
                </div>
                <div className="flex items-center space-x-2 px-2 py-2.5">
                  <Checkbox
                    id="hard-checkbox"
                    checked={selectedDifficulty.some(
                      (value) => value === "HARD"
                    )}
                    onCheckedChange={() => handleDifficultyChange("HARD")}
                  />
                  <Label
                    htmlFor="hard-checkbox"
                    className="flex items-center justify-between max-w-24 w-full"
                  >
                    <span className="text-sm text-sidebar-accent-foreground/90">
                      Hard
                    </span>
                    <span className="ml-auto size-2.5 rounded-[2px] bg-[var(--red-10)]" />
                  </Label>
                </div>
              </div>
            </SidebarGroupContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <SidebarGroup>
        <SidebarGroupContent>
          <Button onClick={handleClearFilters} className="w-full" disabled={!selectedCompanies.length && !selectedTopics.length && !selectedDifficulty.length}>
            Clear Filters
          </Button>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Filters;

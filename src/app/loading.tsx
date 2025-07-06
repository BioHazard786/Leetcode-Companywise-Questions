import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const Loading = () => {
  const columns = Array.from({ length: 6 }, (_, index) => ({
    id: `col-${index}`,
    header: `Column ${index + 1}`,
  }));

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center py-4 px-4">
        <Skeleton className="h-10 w-[250px]" />
      </div>
      <div className="rounded-none border-l-0 w-full border flex-1 overflow-hidden">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="[&>:not(:last-child)]:border-r">
              {columns.map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-6 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 15 }).map((_, index) => (
              <TableRow key={index} className="[&>:not(:last-child)]:border-r">
                {columns.map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Loading;

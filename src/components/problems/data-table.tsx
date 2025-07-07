"use client";

import { columns } from "@/components/problems/columns";
import MoreInfo from "@/components/problems/more-info";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProblems } from "@/hooks/use-problems";
import { Problem } from "@/lib/types";
import {
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter, Search, Settings2 } from "lucide-react";
import { useQueryState } from "nuqs";
import { useRef, useState } from "react";

export function DataTable() {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });
  const { toggleSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProblems();

  const handleSearch = () => {
    if (inputRef.current) {
      setSearchQuery(inputRef.current.value);
    }
  };

  const handleRowClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    // setSelectedProblem(null);
  };

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              Failed to load problems. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive">
              {error instanceof Error
                ? error.message
                : "Unknown error occurred"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Flatten all pages data into a single array
  const allData = data?.pages?.flatMap((page) => page.data) || [];

  const table = useReactTable({
    data: allData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    manualPagination: true,
  });

  if (isLoading) {
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
                <TableRow
                  key={index}
                  className="[&>:not(:last-child)]:border-r"
                >
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
  }

  return (
    <div className="w-full pb-4" key={`table-${allData.length}`}>
      <div className="flex items-center justify-between p-4 gap-2">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            placeholder="Filter problems..."
            defaultValue={searchQuery}
            className="max-w-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button variant="outline" size="icon" onClick={handleSearch}>
            <Search className="size-4.5" />
          </Button>
          <Button
            className="md:hidden"
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
          >
            <Filter className="size-4.5" />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings2 className="size-4.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-none border-l-0 w-full border">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/50 [&>:not(:last-child)]:border-r"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="[&>:not(:last-child)]:border-r cursor-pointer hover:bg-muted/50"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
          >
            {isFetchingNextPage ? (
              <span className="flex gap-2 items-center">
                <Spinner loadingSpanClassName="bg-muted-foreground" />
                Loading
              </span>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      {/* Show total loaded count */}
      <div className="flex justify-center text-sm text-muted-foreground pt-4">
        Showing {allData.length} problems
      </div>

      {/* More Info Sheet */}
      <MoreInfo
        problem={selectedProblem}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
      />
    </div>
  );
}

import Filters from "@/components/problems/filters";
import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="font-medium border-b p-4">
        Filters
      </SidebarHeader>
      <Filters />
      {/* <SidebarFooter>
        <div className="text-xs text-muted-foreground p-4">
          The project is in active development. For feedback, please open an
          issue on GitHub.
        </div>
      </SidebarFooter> */}
    </Sidebar>
  );
}

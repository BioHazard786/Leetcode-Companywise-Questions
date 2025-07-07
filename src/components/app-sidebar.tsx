import Filters from "@/components/problems/filters";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import Link from "next/link";
import { GoHeartFill } from "react-icons/go";
import { SiGithub, SiLinkedin, SiTelegram, SiX } from "react-icons/si";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="font-medium border-b p-4">
        Filters
      </SidebarHeader>
      <Filters />
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-evenly">
          <Button variant="ghost" size="icon">
            <Link
              href="https://github.com/BioHazard786/Leetcode-Companywise-Questions"
              target="_blank"
            >
              <SiGithub className="size-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon">
            <Link href="https://x.com/coder_zaid" target="_blank">
              <SiX className="size-5" />
            </Link>
          </Button>

          <ThemeToggleButton />

          <Button variant="ghost" size="icon">
            <Link href="https://t.me/coder_zaid" target="_blank">
              <SiTelegram className="size-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon">
            <Link
              href="https://www.linkedin.com/in/mohd-zaid-900277229/"
              target="_blank"
            >
              <SiLinkedin className="size-5" />
            </Link>
          </Button>
        </div>
        <div className="text-sm text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
          Made with <GoHeartFill className="text-[var(--red-10)]" /> by{" "}
          <a href="https://github.com/BioHazard786" className="underline">
            Zaid
          </a>
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-center">
          The project is in active development. For feedback, please{" "}
          <a
            className="underline"
            href="https://github.com/BioHazard786/Leetcode-Companywise-Questions/issues"
          >
            open an issue
          </a>{" "}
          on GitHub.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

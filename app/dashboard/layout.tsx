'use client';

import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {ModeToggle} from "@/components/theme-switcher";
import {usePathname} from "next/navigation";

export default function DashboardLayout({
                                          children,
                                        }: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const tabName = pathname.split("/")[2]
  return (
    <main>
      <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1"/>
            <Separator orientation="vertical" className="mr-2 h-4"/>
            <div className="flex justify-between items-center w-full">
              <p>{tabName}</p>
              <ModeToggle/>
            </div>

          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>

    </main>
  );
}

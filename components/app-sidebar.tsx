"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation"; // This is sample data.

// This is sample data.
const data = {
  versions: ["Dark", "Light", "System"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Chat with 🤖 Bartender",
          url: "/dashboard/chat",
        },
      ],
    },
    {
      title: "About",
      url: "#",
      items: [
        {
          title: "Author",
          url: "/dashboard/about",
        },
        {
          title: "Github",
          url: "https://github.com/HugaidaS/AI-workflow",
        },
        {
          title: "Suprise",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar {...props}>
      <SidebarHeader className="justify-center items-center">
        AI workflows & UI Demo
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

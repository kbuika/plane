"use client";

import React from "react";
import { observer } from "mobx-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
// constants
import { EUserWorkspaceRoles } from "@/constants/workspace";
// hooks
import { useUser } from "@/hooks/store";
// plane web constants
import { WORKSPACE_SETTINGS_LINKS } from "@/plane-web/constants/workspace";

export const WorkspaceSettingsSidebar = observer(() => {
  // router
  const { workspaceSlug } = useParams();
  const pathname = usePathname();
  // mobx store
  const {
    membership: { currentWorkspaceRole },
  } = useUser();

  const workspaceMemberInfo = currentWorkspaceRole || EUserWorkspaceRoles.GUEST;

  return (
    <div className="flex w-80 flex-col gap-6 px-5">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-custom-sidebar-text-400">SETTINGS</span>
        <div className="flex w-full flex-col gap-1">
          {WORKSPACE_SETTINGS_LINKS.map(
            (link) =>
              workspaceMemberInfo >= link.access && (
                <Link key={link.key} href={`/${workspaceSlug}${link.href}`}>
                  <span>
                    <div
                      className={`rounded-md px-4 py-2 text-sm font-medium ${
                        link.highlight(pathname, `/${workspaceSlug}`)
                          ? "bg-custom-primary-100/10 text-custom-primary-100"
                          : "text-custom-sidebar-text-200 hover:bg-custom-sidebar-background-80 focus:bg-custom-sidebar-background-80"
                      }`}
                    >
                      {link.label}
                    </div>
                  </span>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
});

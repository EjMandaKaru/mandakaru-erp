import { ReactNode } from "react";
import { NavLink } from "./navbar";

interface sidebarItemProps {
  href: string;
  children: ReactNode;
}

export function SidebarItem(props: sidebarItemProps) {
  return (
    <NavLink href={props.href}>
      <li className="block w-full px-4 py-2 rounded hover:bg-gray-700">
        {props.children}
      </li>
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 h-screen border border-base-300 flex flex-col fixed md:static z-50">
      <ul>
        <SidebarItem href="/dashboard">Dashboard</SidebarItem>
        <SidebarItem href="/dashboard/membros">Membros</SidebarItem>
        {/* <SidebarItem href="/dashboard/registros">
          Registros pendentes
        </SidebarItem>
        <SidebarItem href="/dashboard/registros/arquivados">
          Registros arquivados
        </SidebarItem> */}
      </ul>
    </aside>
  );
}

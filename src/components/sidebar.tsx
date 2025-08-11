"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FileClock,
  FileCheck,
  FileX,
  ChevronDown,
  Menu,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SidebarItem({ href, icon, children }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
          isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"
        }`}
      >
        {icon}
        <span className="font-medium">{children}</span>
      </Link>
    </li>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile button */}
      <div className="md:hidden p-2">
        <button
          className="btn btn-ghost"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 bg-base-100 border-r border-base-300 z-50 p-4 md:hidden"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-base-100 border-r border-base-300 flex-col z-50">
        <SidebarContent />
      </aside>
    </>
  );
}

function SidebarContent() {
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({
    gestao: false,
    financeiro: false,
    marketing: false,
  });

  function toggleMenu(menu: string) {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  }

  return (
    <div className="h-screen overflow-y-scroll">
      <div className="px-4 py-6 text-l font-bold flex items-center gap-2">
        📋 Área de trabalho
      </div>
      <ul className="menu p-2 text-base-content gap-1">
        {/* <SidebarItem href="/trabalho" icon={<LayoutDashboard size={18} />}>
          Início
        </SidebarItem> */}
        <li>
          <button
            className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-base-200 w-full"
            onClick={() => toggleMenu("gestao")}
          >
            <span className="flex items-center gap-3">
              <FileClock size={18} /> Gestão
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openMenus.gestao ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {openMenus.gestao && (
              <motion.ul
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="pl-6 overflow-hidden"
              >
                <SidebarItem
                  href="/trabalho/membros"
                  icon={<FileClock size={16} />}
                >
                  Membros
                </SidebarItem>
                <SidebarItem
                  href="/trabalho/projetos"
                  icon={<FileCheck size={16} />}
                >
                  Projetos
                </SidebarItem>
                {/* <SidebarItem
                  href="/trabalho/eventos"
                  icon={<FileX size={16} />}
                >
                  Eventos
                </SidebarItem> */}
                <SidebarItem
                  href="/trabalho/relatorios"
                  icon={<FileX size={16} />}
                >
                  Gestão de Membros
                </SidebarItem>
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
        <SidebarItem
          href="/trabalho/financeiro"
          icon={<LayoutDashboard size={18} />}
        >
          Financeiro
        </SidebarItem>
      </ul>
    </div>
  );
}

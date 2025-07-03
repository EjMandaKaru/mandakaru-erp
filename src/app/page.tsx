// app/page.tsx (ou pages/index.tsx se não estiver usando App Router)
import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { DashboardCard } from "@/components/DashboardCard";
import { TaskList } from "@/components/TaskList";
import { Alert } from "@/components/Alert";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return <div className="p-6">Sign in to view this page</div>;
  }

  const tasksDoDia = [
    { id: 1, title: "Reunião com equipe de marketing", hora: "10:00" },
    { id: 2, title: "Entrega do relatório mensal", hora: "14:00" },
  ];

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Olá, {user?.firstName}! 👋</h1>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Atividades Pendentes" value="5" />
        <DashboardCard title="Projetos Ativos" value="3" />
        <DashboardCard title="Prazos Hoje" value="2" />
        <DashboardCard title="Notificações" value="1" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Agenda de Hoje</h2>
        <TaskList tasks={tasksDoDia} />
      </section>

      {!user?.emailAddresses?.length && (
        <Alert>
          <p>Deseja completar seu cadastro com um email?</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Atualizar Perfil
          </button>
        </Alert>
      )}
    </main>
  );
}

import { DesligarUsuario } from "@/components/form";
import { getMember } from "@/app/actions";

export interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Editar({ params }: PageProps) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) {
    return <p>Membro não encontrado</p>;
  }
  return <DesligarUsuario  />;
}

import { EditarUsuário } from "@/components/form";
import { getMember } from "@/app/actions";
import { Imember } from "@/interfaces";

interface PageProps {
  params: { id: string };
}

export default async function Editar({ params }: PageProps) {
  const member: Imember = await getMember(params.id);
  if (!member) {
    return <p>Membro não encontrado</p>;
  }
  return <EditarUsuário member={member} />;
}

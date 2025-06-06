import { Input, Button, File } from "@/components/form";
import { addMember } from "@/app/actions";

export default async function Register() {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        action={addMember}
        className="overflow-auto max-h-full max-w-sm lg:min-w-200 mt-5 mx-auto border-base-300 rounded-box w-xs border shadow-2xl p-4"
      >
        <h1>Completar cadastro</h1>
        <Input
          label="Nome completo"
          id="nome"
          placeholder="Exemplo: fulano da silva souza"
        />
        <Input
          label="Matricula"
          id="matricula"
          placeholder="Exemplo: 202511120025"
        />
        <Input
          label="Curso"
          id="curso"
          placeholder="Exemplo: Ciências biológicas"
        />
        <Input
          label="Telefone"
          id="telefone"
          placeholder="Exemplo: (DDD) 9999-9999"
        />
        <Input
          label="Email"
          id="email"
          placeholder="Exemplo: fulanodasilva@gmail.com"
        />

        <File
          id="termo"
          label="Termo de compromisso"
          placeholder="Máximo 10MB"
        ></File>
        <Button className="w-full">Enviar</Button>
      </form>
    </div>
  );
}

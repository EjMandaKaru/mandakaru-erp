import { auth, currentUser } from "@clerk/nextjs/server";
export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <main>
      <div>
        Olá {user?.firstName}! Bem vindo ao Sistema de gerenciamento de
        atividades empresariais mandakaru!
        {!user?.emailAddresses && (
          <p>
            deseja completar seu cadastro? <br />
          </p>
        )}
      </div>
    </main>
  );
}

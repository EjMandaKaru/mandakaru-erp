import { Imember, ImemberTable } from "@/interfaces";
import {
  ActiveBtn,
  ArquiveBtn,
  DeleteBtn,
  EditBtn,
  Modal,
  RemoveBtn,
} from "./modal";
import React, { ReactNode } from "react";
import { UserCog, UserPlus } from "lucide-react";
import {
  activeMember,
  addMemberToQueue,
  arquiveMember,
  deleteMember,
  pendingMember,
} from "@/app/actions";

type ITableHead = {
  id: string | number;
  children?: ReactNode;
};

type ITableBody = {
  children: ReactNode;
};

export function TableHead(props: ITableHead) {
  return (
    <thead key={props.id}>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Nome</th>
        <th>Cargo</th>
        <th>Matricula</th>
        {props.children}
      </tr>
    </thead>
  );
}

export function TableFooter() {
  return (
    <tfoot>
      <tr>
        <th></th>
        <th>Nome</th>
        <th>Cargo</th>
        <th>Matricula</th>
        <th></th>
      </tr>
    </tfoot>
  );
}

export function TableBody(props: ITableBody) {
  return <tbody>{props.children}</tbody>;
}

export function Table(props: ImemberTable) {
  const childrenArray = React.Children.toArray(props.children).filter(
    React.isValidElement
  );
  const header = childrenArray.find((child) => child.type === TableHead);
  const body = childrenArray.find((child) => child.type === TableBody);
  const footer = childrenArray.find((child) => child.type === TableFooter);
  return (
    <div>
      <h2 className="text-2xl mb-2 mt-8">{props.title}</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {header}
          {body}
          {footer}
        </table>
      </div>
    </div>
  );
}

// export function Row(member: Imember) {
//   return (
//     <tr>
//       <th>
//         <label>
//           <input type="checkbox" className="checkbox" />
//         </label>
//       </th>
//       <td>
//         <div className="flex items-center gap-3">
//           {/* <div className="avatar">
//                     <div className="mask mask-squircle h-12 w-12">
//                       <Image
//                         width={54}
//                         height={54}
//                         alt="Avatar Tailwind CSS Component"
//                       />
//                     </div>
//                   </div> */}
//           <div>
//             <div className="font-bold">{member.name}</div>
//             <div className="text-sm opacity-50">{member.status}</div>
//           </div>
//         </div>
//       </td>
//       <td>{member.cargo}</td>
//       <td>{member.matricula}</td>
//       <th>
//         <ModalDetails
//           id={member.id}
//           name={member.name}
//           matricula={member.matricula}
//           curso={member.curso}
//           email={member.email}
//           status={member.status}
//           telefone={member.telefone}
//           cargo={member.cargo}
//         />
//       </th>
//     </tr>
//   );
// }

export function MemberTableSection({
  title,
  members,
}: {
  title: string;
  members: Imember[];
}) {
  return (
    <Table title={title}>
      <TableHead id={title}>
        <th>
          <Modal name="add_member" trigger={<UserPlus></UserPlus>}>
            <form action={addMemberToQueue}>
              <label
                htmlFor="matricula"
                className="block text-lg font-bold mb-2"
              >
                Adicionar membro
              </label>

              <input
                type="text"
                id="matricula"
                name="matricula"
                placeholder="Matícula"
                className="input m-2"
                required
              />
              <button type="submit" className="btn btn-success text-2x m-2">
                Enviar
              </button>
            </form>
          </Modal>
        </th>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <tr key={member.id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                {/* <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image
                        width={54}
                        height={54}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div> */}
                <div>
                  <div className="font-bold">{member.name}</div>
                  <div className="text-sm opacity-50">{member.status}</div>
                </div>
              </div>
            </td>
            <td>{member.cargo}</td>
            <td>{member.matricula}</td>
            <th>
              <Modal name="details" trigger={<UserCog />}>
                <div>
                  <h2 className="block text-lg font-bold mb-2">
                    {member.name}
                  </h2>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Status: </span>
                    {member.status}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Id: </span>
                    {member.id}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Cargo: </span>
                    {member.cargo}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Matricula: </span>
                    {member.matricula}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Curso: </span>
                    {member.curso}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Email: </span>
                    {member.email}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Telefone: </span>
                    {member.telefone}
                  </p>
                  <EditBtn id={member.id}></EditBtn>
                  <form action={arquiveMember} className="inline">
                    <ArquiveBtn id={member.id} />
                  </form>
                </div>
              </Modal>
            </th>
          </tr>
        ))}
      </TableBody>
      <TableFooter />
    </Table>
  );
}

export function ArquivedTableSection({
  title,
  members,
}: {
  title: string;
  members: Imember[];
}) {
  return (
    <Table title={title}>
      <TableHead id={title} />
      <TableBody>
        {members.map((member) => (
          <tr key={member.id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                {/* <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image
                        width={54}
                        height={54}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div> */}
                <div>
                  <div className="font-bold">{member.name}</div>
                  <div className="text-sm opacity-50">{member.status}</div>
                </div>
              </div>
            </td>
            <td>{member.cargo}</td>
            <td>{member.matricula}</td>
            <th>
              <Modal name="arquivedDetails" trigger={<UserCog />}>
                <div>
                  <h2 className="block text-lg font-bold mb-2">
                    {member.name}
                  </h2>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Status: </span>
                    {member.status}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Id: </span>
                    {member.id}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Cargo: </span>
                    {member.cargo}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Matricula: </span>
                    {member.matricula}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Curso: </span>
                    {member.curso}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Email: </span>
                    {member.email}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Telefone: </span>
                    {member.telefone}
                  </p>
                  <form action={pendingMember} className="inline">
                    <RemoveBtn id={member.id} />
                  </form>
                  <form action={deleteMember} className="inline">
                    <DeleteBtn id={member.id} />
                  </form>
                </div>
              </Modal>
            </th>
          </tr>
        ))}
      </TableBody>
      <TableFooter />
    </Table>
  );
}

export function PendingTableSection({
  title,
  members,
}: {
  title: string;
  members: Imember[];
}) {
  return (
    <Table title={title}>
      <TableHead id={title} />
      <TableBody>
        {members.map((member) => (
          <tr key={member.id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                {/* <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image
                        width={54}
                        height={54}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div> */}
                <div>
                  <div className="font-bold">{member.name}</div>
                  <div className="text-sm opacity-50">{member.status}</div>
                </div>
              </div>
            </td>
            <td>{member.cargo}</td>
            <td>{member.matricula}</td>
            <th>
              <Modal name="pendingDetails" trigger={<UserCog />}>
                <div>
                  <h2 className="block text-lg font-bold mb-2">
                    {member.name}
                  </h2>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Status: </span>
                    {member.status}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Id: </span>
                    {member.id}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Cargo: </span>
                    {member.cargo}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Matricula: </span>
                    {member.matricula}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Curso: </span>
                    {member.curso}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Email: </span>
                    {member.email}
                  </p>
                  <p className="block text-white mb-2">
                    <span className="text-gray-400">Telefone: </span>
                    {member.telefone}
                  </p>
                  <EditBtn id={member.id} />
                  <form action={activeMember} className="inline">
                    <ActiveBtn id={member.id} />
                  </form>
                  <form action={arquiveMember} className="inline">
                    <ArquiveBtn id={member.id} />
                  </form>
                </div>
              </Modal>
            </th>
          </tr>
        ))}
      </TableBody>
      <TableFooter />
    </Table>
  );
}

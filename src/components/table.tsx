import { Imember, ImemberTable } from "@/interfaces";
import {
  ModalDetails,
  ModalArquivedDetails,
  AddMemberModal,
  ModalPendingDetails,
} from "./modal";
import React, { ReactNode } from "react";

type ITableHead = {
  id: string | number;
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
        <th>
          <AddMemberModal />
        </th>
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
              <ModalDetails
                id={member.id}
                name={member.name}
                matricula={member.matricula}
                curso={member.curso}
                email={member.email}
                status={member.status}
                telefone={member.telefone}
                cargo={member.cargo}
              />
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
              <ModalArquivedDetails
                id={member.id}
                name={member.name}
                matricula={member.matricula}
                curso={member.curso}
                email={member.email}
                status={member.status}
                telefone={member.telefone}
                cargo={member.cargo}
              />
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
              <ModalPendingDetails
                id={member.id}
                name={member.name}
                matricula={member.matricula}
                curso={member.curso}
                email={member.email}
                status={member.status}
                telefone={member.telefone}
                cargo={member.cargo}
              />
            </th>
          </tr>
        ))}
      </TableBody>
      <TableFooter />
    </Table>
  );
}

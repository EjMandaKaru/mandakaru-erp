import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { InavLink, IdropdownBtn, InavList } from "@/interfaces";
import { Menu } from "lucide-react";
export function NavLink(props: InavLink) {
  return (
    <Link href={props.href} className={props.className}>
      {props.children}
    </Link>
  );
}

function DropdownBtn(props: IdropdownBtn) {
  return (
    <div
      tabIndex={0}
      role="button"
      className={props.className + " btn btn-ghost"}
    >
      {props.children}
    </div>
  );
}

function NavList(props: InavList) {
  return (
    <ul
      tabIndex={0}
      className={
        props.className +
        " menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      }
    >
      {props.children}
    </ul>
  );
}

export function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-sm border border-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <DropdownBtn className="btn-circle">
            <h1>
              <Menu />
            </h1>
          </DropdownBtn>
          <NavList className="border border-base-300">
            <NavLink href="/">Página principal</NavLink>
            <NavLink href="/trabalho">Área de trabalho</NavLink>
            <NavLink href="/registrar">Cadastro</NavLink>
            {/* <NavLink href="/sobre">Sobre</NavLink> */}
          </NavList>
        </div>
      </div>
      <div className="navbar-center">
        <Link className="btn btn-ghost text-xl" href="/">
          MandaKaru
        </Link>
      </div>
      <div className="navbar-end">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

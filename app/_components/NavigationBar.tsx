import Logo from "./Logo";
import LoginModal from "./LoginModal";
import { auth } from "../_lib/auth";
import Link from "next/link";

import SignOut from "./SignOut";

import SearchInput from "./SearchInput";
import DropDownMenu from "./DropDownMenu";

export default async function NavigationBar() {
  const session = await auth();

  return (
    <header className="sticky top-0 bg-white shadow">
      <div className="container flex flex-row justify-between items-center mx-auto py-4 px-8">
        <Logo />

        <SearchInput />

        {!session?.user ? <LoginModal /> : <DropDownMenu />}
      </div>
    </header>
  );
}

import type { JSX } from "react";
import type { Note } from "../../types/Note";
import NoteList from "../NoteLists";
import { useToggle } from "@/hooks";

type SideNavProps = {
  noteData: Note[];
  isSmallScreen: boolean;
};

export default function SideNav({
  noteData,
  isSmallScreen,
}: SideNavProps): JSX.Element {
  const [isNavOpen, toggleisNavOpen] = useToggle(true);

  const openForm = () => {
    console.log("open Form");
  };

  const navBarToggle = () => {
    toggleisNavOpen();
    console.log("navbartoggle", isNavOpen);
  };

  return (
    <section
      className={`navbar duration-750 ease-in-out ${isNavOpen && "active"}`}
    >
      <nav
        className={`bg-primary fixed w-3/5 h-full py-2 transition-transform duration-750 ease-in-out ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="font-bold text-center text-xl my-1 mb-3">Note App</h1>
        <button className="btn py-1.5 mb-5" onClick={openForm}>
          + New Note
        </button>
        <NoteList noteData={noteData} isSmallScreen={isSmallScreen} />
      </nav>
      <button
        onClick={navBarToggle}
        className={`bg-red-600 fixed top-1/2 transform -translate-y-1/2 py-3 px-0.5 rounded-r transition-[left] duration-750 ease-in-out  ${
          isNavOpen ? "left-3/5" : "left-0"
        }`}
      >
        <span>&#11208;</span>
      </button>
    </section>
  );

  <style></style>;
}

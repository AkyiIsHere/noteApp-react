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
  const [isNavOpen, setIsNavOpen] = useToggle(false);

  const openForm = () => {
    console.log("open Form");
  };

  const navBarToggle = () => {
    console.log("navbartoggle");
  };

  return (
    <section className="bg-lime-800 absolute w-3/5 h-full min-h-full sm:relative sm:block sm:flex-1/3">
      {isNavOpen && (
        <nav className="bg-primary w-full h-full py-2">
          <h1 className="font-bold text-center text-xl my-1 mb-3">Note App</h1>
          <button className="btn py-1.5 mb-5" onClick={openForm}>
            + New Note
          </button>
          <NoteList noteData={noteData} isSmallScreen={isSmallScreen} />
        </nav>
      )}
      <button
        onClick={navBarToggle}
        className="bg-red-600 absolute left-full top-1/2 transform -translate-y-1/2 py-3 px-0.5 rounded-r"
      >
        <span>&#11208;</span>
      </button>
    </section>
  );
}

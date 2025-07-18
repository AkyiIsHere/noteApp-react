import { useEffect, type JSX } from "react";
import type { Note } from "../../types/Note";
import NoteList from "./NoteLists";

type SideNavProps = {
  noteData: Note[];
  isSmallScreen: boolean;
  myRef: React.RefObject<HTMLElement | null>;
  isNavOpen: boolean;
  toggleisNavOpen: (mode?: boolean) => void;
};

export default function SideNav({
  noteData,
  isSmallScreen,
  myRef,
  isNavOpen,
  toggleisNavOpen,
}: SideNavProps): JSX.Element {
  const openForm = () => {
    console.log("open Form");
  };

  const navBarToggle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    toggleisNavOpen();
  };

  useEffect(() => {
    if (!isNavOpen) {
      return;
    }
    const closeNavHandler = (event: MouseEvent | null) => {
      if (
        myRef.current &&
        isNavOpen &&
        event && // Ensure event is not null
        event.target instanceof Node && // Type guard: check if target is a Node
        !myRef.current.contains(event.target) // Now TypeScript knows event.target is a Node
      ) {
        toggleisNavOpen(false);
      }
    };

    // if (isNavOpen) {
    document.addEventListener("click", closeNavHandler);
    // } else {
    // document.removeEventListener("click", closeNavHandler);
    // }
    console.log("navbartoggle", isNavOpen);

    return () => {
      document.removeEventListener("click", closeNavHandler);
    };
  }, [isNavOpen, myRef, toggleisNavOpen]);

  return (
    <nav ref={myRef} className={`sidenav ${isNavOpen && "active"}`}>
      <h1 className="font-bold text-center text-xl my-1 mb-3">Note App</h1>
      <button className="btn py-1.5 mb-5" onClick={openForm}>
        + New Note
      </button>
      <NoteList noteData={noteData} isSmallScreen={isSmallScreen} />
      <button
        onClick={navBarToggle}
        className={`bg-red-600 absolute left-full top-1/2 transform -translate-y-1/2 py-3 px-0.5 rounded-r transition-[left] duration-750 ease-in-out cursor-pointer`}
      >
        <span
          className={`inline-block transition-transform duration-750 -translate-x-px ${
            isNavOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          &#11208;
        </span>
      </button>
    </nav>
  );
}

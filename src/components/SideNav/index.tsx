import { useEffect, type JSX } from "react";
import type { Note } from "../../types/Note";
import NoteList from "./NoteLists";

type SideNavProps = {
  noteData: Note[];
  activeNoteId: string | null;
  isSmallScreen: boolean;
  myRef: React.RefObject<HTMLElement | null>;
  isNavOpen: boolean;
  isFormOpen: boolean;
  isEditing: boolean;
  toggleIsNavOpen: (mode?: boolean) => void;
  toggleIsFormOpen: (mode?: boolean) => void;
  setActiveNote: React.Dispatch<React.SetStateAction<Note | null>>;
};

export default function SideNav({
  noteData,
  activeNoteId,
  isSmallScreen,
  myRef,
  isNavOpen,
  isFormOpen,
  isEditing,
  toggleIsNavOpen,
  toggleIsFormOpen,
  setActiveNote,
}: SideNavProps): JSX.Element {
  const openForm = () => {
    toggleIsFormOpen(true);
    setActiveNote(null);
    if (isSmallScreen) {
      toggleIsNavOpen(false);
    }
  };

  const navBarToggle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    toggleIsNavOpen();
  };

  const navLinkClickHandler = (note: Note) => {
    toggleIsFormOpen(false);
    setActiveNote(note);
    if (isSmallScreen) {
      toggleIsNavOpen(false);
    }
  };

  useEffect(() => {
    if (!isSmallScreen) {
      return;
    }
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
        toggleIsNavOpen(false);
      }
    };

    // if (isNavOpen) {
    document.addEventListener("click", closeNavHandler);
    // } else {
    // document.removeEventListener("click", closeNavHandler);
    // }

    return () => {
      document.removeEventListener("click", closeNavHandler);
    };
  }, [isNavOpen, myRef, toggleIsNavOpen, isSmallScreen]);

  return (
    <nav
      ref={myRef}
      className={`sidenav flex flex-col ${isNavOpen && "active"}`}
    >
      <h1 className="font-bold text-center text-xl my-1 mb-3">Note App</h1>
      <button
        className={`btn py-1.5 mb-5 ${
          isFormOpen && (!isEditing ? "bg-green-400" : null)
        }`}
        onClick={openForm}
      >
        + New Note
      </button>
      <NoteList
        noteData={noteData}
        activeNoteId={activeNoteId}
        isSmallScreen={isSmallScreen}
        navLinkClickHandler={navLinkClickHandler}
      />
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

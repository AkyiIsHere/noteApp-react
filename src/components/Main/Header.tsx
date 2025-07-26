import { useToggle } from "@/hooks";
import { useEffect, useRef } from "react";
import type { Note } from "@/types/Note";

type HeaderProps = {
  isSmallScreen: boolean;
  isFormOpen: boolean;
  activeNote?: Note | null;
  handleEditNote: () => void;
  handleDeleteNote: () => void;
};

export default function Header({
  isSmallScreen,
  isFormOpen,
  activeNote,
  handleEditNote,
  handleDeleteNote,
}: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [isOptionBoxOpen, toggleIsOptionBoxOpen] = useToggle(false);

  useEffect(() => {
    if (!isOptionBoxOpen) {
      return;
    }

    const handleOptionBox = (event: MouseEvent | null) => {
      event?.stopPropagation();
      if (
        headerRef.current &&
        event &&
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        toggleIsOptionBoxOpen(false);
      }
    };

    document.addEventListener("click", handleOptionBox);

    return () => {
      document.removeEventListener("click", handleOptionBox);
    };
  }, [isOptionBoxOpen, toggleIsOptionBoxOpen]);

  return (
    <header ref={headerRef} className="header">
      <h1 className=" text-xl font-bold text-nowrap grow-1 sm:flex-4/5 sm:text-2xl mr-4 overflow-hidden">
        {isFormOpen ? "New Note" : activeNote?.title ?? "Welcome"}
      </h1>

      {!isFormOpen && (
        <button
          className={`font-bold text-xl ${isSmallScreen ? "block" : "hidden"}`}
          onClick={() => toggleIsOptionBoxOpen()}
        >
          &#9776;
        </button>
      )}

      {!isFormOpen && activeNote !== null && (
        <div className={`option-btns-group ${isOptionBoxOpen && "active"}`}>
          <button
            className="btn w-18 bg-yellow-500 hover:bg-accent mx-0"
            type="button"
            onClick={handleEditNote}
          >
            Edit
          </button>
          <button
            className="btn w-18 bg-red-600 hover:bg-accent mx-0"
            type="button"
            onClick={handleDeleteNote}
          >
            Delete
          </button>
        </div>
      )}
    </header>
  );
}

import { useState, useEffect, useRef } from "react";
import type { Note } from "@/types/Note";
import { useIsSmallScreen } from "@/hooks";
import SideNav from "@/components/SideNav";
import { useToggle } from "@/hooks";
import Main from "./components/Main";
import useLocalStorage from "./hooks/useLocalStorage";

// import Test from "./Test";

const notes: Note[] = [
  { id: "1", title: "Note 1", content: "Note 1 Content" },
  { id: "2", title: "Note 2", content: "Note 2 Content" },
  { id: "3", title: "Note 3", content: "Note 3 Content" },
  { id: "4", title: "123456789012345678901", content: "Note 3 Content" },
];

export default function App() {
  const myRef = useRef<HTMLElement>(null);
  const isSmallScreen = useIsSmallScreen();

  const [noteData, setNoteData] = useLocalStorage<Note[]>(notes.reverse());
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isNavOpen, toggleIsNavOpen] = useToggle(isSmallScreen ? false : true);
  const [isFormOpen, toggleIsFormOpen] = useToggle(false);
  const [isEditing, toggleIsEditing] = useToggle(false);
  const [navWidth, setNavWidth] = useState(0);

  useEffect(() => {
    if (myRef.current) {
      const observer = new ResizeObserver((entries) => {
        const newWidth = entries[0].borderBoxSize[0].inlineSize;
        setNavWidth(newWidth);
      });

      observer.observe(myRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    //to make scrollbar styles globally, if you want to use scroll in any component, you can just add scrollbar or scrollbar-thin
    <div className="flex w-full h-dvh min-h-dvh bg-background scrollbar-thumb-accent scrollbar-track-primary ">
      <SideNav
        noteData={noteData}
        activeNoteId={activeNote ? activeNote.id : null}
        isSmallScreen={isSmallScreen}
        myRef={myRef}
        isNavOpen={isNavOpen}
        isFormOpen={isFormOpen}
        isEditing={isEditing}
        toggleIsNavOpen={toggleIsNavOpen}
        toggleIsFormOpen={toggleIsFormOpen}
        setActiveNote={setActiveNote}
      />
      {/* for navBar dark background overlay */}
      {isSmallScreen && (
        <div
          className={`fixed w-dvw h-dvh inset-0 bg-slate-900/50  ${
            isNavOpen ? "block" : "hidden"
          }`}
        ></div>
      )}
      <Main
        isNavOpen={isNavOpen}
        isSmallScreen={isSmallScreen}
        isFormOpen={isFormOpen}
        isEditing={isEditing}
        activeNote={activeNote}
        noteData={noteData}
        navWidth={navWidth}
        toggleIsFormOpen={toggleIsFormOpen}
        toggleIsEditing={toggleIsEditing}
        setNoteData={setNoteData}
        setActiveNote={setActiveNote}
      />

      {/* <Test /> */}
    </div>
  );
}

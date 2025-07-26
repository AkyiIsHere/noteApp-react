import type { Note } from "@/types/Note";
import Header from "./Header";
import Form from "./Form";
import { useEffect } from "react";

type MainProps = {
  isSmallScreen: boolean;
  isNavOpen: boolean;
  isFormOpen: boolean;
  isEditing: boolean;
  activeNote: Note | null;
  noteData: Note[] | null;
  navWidth: number;
  toggleIsFormOpen: (mode?: boolean) => void;
  toggleIsEditing: (value?: boolean | undefined) => void;
  setNoteData: React.Dispatch<React.SetStateAction<Note[]>>;
  setActiveNote: React.Dispatch<React.SetStateAction<Note | null>>;
};

export default function Main({
  isSmallScreen,
  isNavOpen,
  isFormOpen,
  isEditing,
  activeNote,
  noteData,
  navWidth,
  toggleIsFormOpen,
  toggleIsEditing,
  setNoteData,
  setActiveNote,
}: MainProps) {
  const handleEditNote = () => {
    if (!activeNote) {
      return;
    }
    toggleIsFormOpen(true);
    toggleIsEditing(true);
  };

  const handleDeleteNote = () => {
    if (!activeNote) {
      return;
    }
    const isDelete = confirm("Are you sure you want to delete this note?");
    if (isDelete) {
      setNoteData((prev) => {
        const updatedNotes = prev.filter((note) => note.id !== activeNote.id);

        // setActiveNote(() => {
        //   if (Array.isArray(noteData) && noteData.length > 0) {
        //     return noteData[0];
        //   } else {
        //     return null;
        //   }
        // });
        setActiveNote(() =>
          Array.isArray(noteData) && noteData?.length > 0 ? noteData[0] : null
        );

        return updatedNotes;
      });
    }
  };

  useEffect(() => {
    if (!isFormOpen) {
      toggleIsEditing(false);
    }
  }, [isFormOpen, isEditing, toggleIsEditing]);

  return (
    <main
      className="main"
      style={{
        marginLeft: isSmallScreen ? 0 : isNavOpen ? 0 : `-${navWidth}px`,
      }}
    >
      <Header
        isSmallScreen={isSmallScreen}
        isFormOpen={isFormOpen}
        activeNote={activeNote}
        handleEditNote={handleEditNote}
        handleDeleteNote={handleDeleteNote}
      />
      {isFormOpen ? (
        <Form
          isEditing={isEditing}
          activeNote={activeNote}
          setNoteData={setNoteData}
          setActiveNote={setActiveNote}
          toggleIsFormOpen={toggleIsFormOpen}
        />
      ) : (
        <div className="py-2 px-8">
          <h2 className="text-lg sm:text-xl underline decoration-amber-300 mb-2.5 text-justify">
            {activeNote ? activeNote.title : "No note selected"}
          </h2>
          <p className="text-sm sm:text-md text-justify indent-6">
            {activeNote
              ? activeNote.content
              : "Select a note from the sidebar or create a new one."}
          </p>
        </div>
      )}
    </main>
  );
}

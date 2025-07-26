import type { Note } from "../../types/Note";

type NoteListProps = {
  noteData: Note[];
  activeNoteId: string | null;
  isSmallScreen: boolean;
  navLinkClickHandler: (note: Note) => void;
};

export default function NoteList({
  noteData,
  activeNoteId,
  isSmallScreen,
  navLinkClickHandler,
}: NoteListProps): React.ReactElement {
  return (
    <ul className="py-2 overflow-y-auto scrollbar">
      {noteData.map((note) => (
        <li
          key={note.id}
          className={`btn mb-1.5 ${
            note.id === activeNoteId ? "bg-green-400" : null
          }`}
          onClick={() => navLinkClickHandler(note)}
        >
          {isSmallScreen ? note.title.slice(0, 10) : note.title.slice(0, 20)}
        </li>
      ))}
    </ul>
  );
}

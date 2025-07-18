import type { Note } from "../../types/Note";

type NoteListProps = {
  noteData: Note[];
  isSmallScreen: boolean;
};

export default function NoteList({
  noteData,
  isSmallScreen,
}: NoteListProps): React.ReactElement {
  const navLinkClickHandler = () => {
    console.log("hi");
  };

  return (
    <ul className=" ">
      {noteData.map((note) => (
        <li key={note.id} className="btn mb-1.5" onClick={navLinkClickHandler}>
          {isSmallScreen ? note.title.slice(0, 10) : note.title.slice(0, 20)}
        </li>
      ))}
    </ul>
  );
}

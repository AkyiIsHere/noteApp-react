import { useState } from "react";
import type { Note } from "@/types/Note";
import { useIsSmallScreen } from "@/hooks";
import SideNav from "@/components/SideNav";

const notes: Note[] = [
  { id: "1", title: "Note 1", content: "Note 1 Content" },
  { id: "2", title: "Note 2", content: "Note 2 Content" },
  { id: "3", title: "Note 3", content: "Note 3 Content" },
  { id: "4", title: "123456789012345678901", content: "Note 3 Content" },
];

export default function App() {
  const [noteData, setNoteData] = useState<Note[]>(notes);
  const isSmallScreen = useIsSmallScreen();

  return (
    <div className="flex w-full h-dvh min-h-dvh bg-background">
      <SideNav noteData={noteData} isSmallScreen={isSmallScreen} />=
      <main className="w-full sm:flex-2/3">Main</main>
    </div>
  );
}

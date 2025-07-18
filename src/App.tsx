import { useState, useEffect, useRef } from "react";
import type { Note } from "@/types/Note";
import { useIsSmallScreen } from "@/hooks";
import SideNav from "@/components/SideNav";
import { useToggle } from "@/hooks";

// import Test from "./Test";

const notes: Note[] = [
  { id: "1", title: "Note 1", content: "Note 1 Content" },
  { id: "2", title: "Note 2", content: "Note 2 Content" },
  { id: "3", title: "Note 3", content: "Note 3 Content" },
  { id: "4", title: "123456789012345678901", content: "Note 3 Content" },
];

export default function App() {
  const [noteData, setNoteData] = useState<Note[]>(notes);
  const [isNavOpen, toggleisNavOpen] = useToggle(true);
  const [navWidth, setNavWidth] = useState(0);
  const myRef = useRef<HTMLElement>(null);
  const isSmallScreen = useIsSmallScreen();

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
    <div className="flex w-full h-dvh min-h-dvh bg-background">
      <SideNav
        noteData={noteData}
        isSmallScreen={isSmallScreen}
        myRef={myRef}
        isNavOpen={isNavOpen}
        toggleisNavOpen={toggleisNavOpen}
      />
      <main
        className="grow-1 transition-[margin-left] duration-750 ease-in-out"
        style={{
          marginLeft: isSmallScreen ? 0 : isNavOpen ? 0 : `-${navWidth}px`,
        }}
      >
        Main
      </main>

      {/* <Test /> */}
    </div>
  );
}

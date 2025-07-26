import { useEffect, useRef } from "react";
import type { Note } from "@/types/Note";
import { v4 as uuidv4 } from "uuid";

type FormProps = {
  isEditing?: boolean;
  activeNote: Note | null;
  toggleIsFormOpen: (mode?: boolean) => void;
  setNoteData: React.Dispatch<React.SetStateAction<Note[]>>;
  setActiveNote: React.Dispatch<React.SetStateAction<Note | null>>;
};

// type NoteFromInput = Omit<Note, "id">;

export default function Form({
  isEditing = false,
  activeNote,
  toggleIsFormOpen,
  setNoteData,
  setActiveNote,
}: FormProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (formData: FormData) => {
    // const data = Object.fromEntries(formData) as NoteFromInput;
    // const id = uuidv4();
    // const newNote: Note = { id, ...data };
    // console.log(newNote);
    // setNoteData((prev) => [...prev, newNote]);

    try {
      const rawTitle = formData.get("title");
      const rawContent = formData.get("content");
      if (typeof rawTitle !== "string" || typeof rawContent !== "string") {
        throw new Error("Invalid Form Inputs!");
      }
      const title: string = rawTitle.trim();
      const content: string = rawContent.trim();
      const id = isEditing ? activeNote?.id : uuidv4();
      if (!id) {
        throw new Error("Id is undefined or null!");
      }
      const newNote: Note = {
        id,
        title,
        content,
      };
      // if (isEditing) {
      //   setNoteData((prev) =>
      //     prev.map((note) => (note.id === activeNote?.id ? newNote : note))
      //   );
      // } else {
      //   setNoteData((prev) => [newNote, ...prev]);
      // }

      setNoteData((prev) => {
        if (isEditing) {
          return prev.map((note) =>
            note.id === activeNote?.id ? newNote : note
          );
        } else {
          return [newNote, ...prev];
        }
      });

      setActiveNote(newNote);

      toggleIsFormOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        alert(err);
      }
    }
  };

  const handleTextAreaChange = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // Reset first
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleTextAreaChange();
  }, []);

  return (
    <form action={handleSubmit} className="px-8 overflow-y-auto scrollbar ">
      <div className="flex flex-col gap-y-1 my-2 mb-5">
        <label htmlFor="title" className="font-bold text-sm sm:text-lg">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="input"
          required
          defaultValue={isEditing ? activeNote?.title : ""}
        />
      </div>

      <div className="flex flex-col gap-y-1 my-2">
        <label htmlFor="content" className="font-bold text-sm sm:text-lg">
          Content
        </label>
        <textarea
          ref={textareaRef}
          name="content"
          id="content"
          className="input min-h-40 p-2 overflow-hidden resize-none"
          onChange={handleTextAreaChange}
          required
          defaultValue={isEditing ? activeNote?.content : ""}
        ></textarea>
      </div>

      <div className="flex justify-end gap-3 mt-3 mb-8 text-sm sm:text-md font-bold">
        <button
          type="button"
          className="btn w-auto bg-red-600 hover:bg-accent mx-0 px-2 sm:px-4"
          onClick={() => toggleIsFormOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn w-auto bg-emerald-600 hover:bg-accent mx-0 px-2 sm:px-4"
        >
          Add Note
        </button>
      </div>
    </form>
  );
}

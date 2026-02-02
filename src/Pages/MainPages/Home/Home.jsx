import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import NoteModel from "../../../Components/NoteModel";
import { getNoteApi } from "../../../lib/apis/mainApi";
import NoteItem from "../../../Components/NoteItem";

export default function Home() {
  const [show, setShow] = useState(false);
  const [allNotes, setAllNotes] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleClose = () => {
    setShow(false);
    setIsUpdateMode(false);
    setSelectedNote(null);
  };

  function handleUpdate(note) {
    setShow(true);
    setIsUpdateMode(true);
    setSelectedNote(note);
  }

  function getAllNotes() {
    getNoteApi().then((res) => setAllNotes(res.data.notes));
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <section className="relative min-h-screen bg-[#070a10] overflow-hidden">
      {/* Green Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-32 h-[500px] w-[500px]
        -translate-x-1/2 rounded-full
        bg-[radial-gradient(circle,rgba(34,197,94,0.35)_0%,transparent_70%)]
        blur-3xl"
      />

      {/* Header */}
      <div className="relative z-10 pt-20 text-center text-white">
        <h1 className="font-serif text-5xl tracking-wide">Your Notes</h1>
        <p className="mt-3 text-sm text-gray-400">
          Write freely. No names. No noise.
        </p>

        <Button
          variant="success"
          className="mt-6 px-5 py-2 rounded-pill shadow-lg"
          onClick={() => setShow(true)}
        >
          Add Note
        </Button>
      </div>

      {/* Notes */}
      <div className="relative z-10 container mt-16">
        <div className="row g-4">
          {allNotes?.map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              getAllNotes={getAllNotes}
              handleUpdate={() => handleUpdate(note)}
            />
          ))}
        </div>
      </div>

      <NoteModel
        isUpdateMode={isUpdateMode}
        getAllNotes={getAllNotes}
        show={show}
        handleClose={handleClose}
        selectedNote={selectedNote}
      />
    </section>
  );
}

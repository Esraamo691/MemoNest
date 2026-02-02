import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { deleteNoteApi } from "../lib/apis/mainApi";
import { toast } from "react-toastify";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export default function NoteItem({ note, getAllNotes, handleUpdate }) {
  const [isLoading, setIsLoading] = useState(false);

  function deleteNote() {
    setIsLoading(true);
    deleteNoteApi(note._id)
      .then(() => {
        toast.success("Note Deleted Successfully", { theme: "dark" });
        getAllNotes();
      })
      .catch(() => toast.error("Note Deletion Failed"))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="col-md-3">
      <Card className="note-card">
        <Card.Body>
          <Card.Title className="fw-bold text-white text-truncate">
            {note.title}
          </Card.Title>

          <Card.Text
            className="text-gray-300 small"
            style={{ minHeight: "70px" }}
          >
            {note.content}
          </Card.Text>

          <div className="note-actions">
            <Button onClick={handleUpdate} className="note-btn">
              <FaEdit /> Edit
            </Button>

            <Button
              onClick={deleteNote}
              className="note-btn danger"
              disabled={isLoading}
            >
              {isLoading ? <span className="loader"></span> : <FaTrashAlt />}
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

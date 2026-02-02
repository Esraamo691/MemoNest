import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AddNoteApi, updateNoteApi } from "../lib/apis/mainApi";
import { toast } from "react-toastify";
export default function NoteModel({
  show,
  handleClose,
  getAllNotes,
  isUpdateMode,
  selectedNote,
}) {
  const [titleNote, setTitleNote] = useState(null);
  const [contentNote, setContentNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (selectedNote != null) {
      setContentNote(selectedNote.content);
      setTitleNote(selectedNote.title);
    } else {
      setContentNote("");
      setTitleNote("");
    }
  }, [show]);
  function addNote() {
    setIsLoading(true);
    AddNoteApi(titleNote, contentNote)
      .then((res) => {
        toast.success("Note Added Successfully", {
          theme: "dark",
          position: "top-right",
        });
        getAllNotes();
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          theme: "dark",
          position: "top-right",
        });
      })
      .finally(() => {
        setIsLoading(false);
        handleClose();
      });
  }

  function updateNote() {
    setIsLoading(true);
    updateNoteApi(titleNote, contentNote, selectedNote._id)
      .then((res) => {
        console.log(res);
        toast.success("Note Updated Successfully", {
          theme: "dark",
        });
        getAllNotes();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Note Updating Failed", {
          theme: "dark",
        });
      })
      .finally(() => {
        setIsLoading(false);
        handleClose();
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (isUpdateMode) {
      updateNote();
    } else {
      addNote();
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isUpdateMode ? "Update Note" : "Add Note"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title Of Task"
                autoFocus
                onChange={(e) => setTitleNote(e.target.value)}
                value={titleNote}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                onChange={(e) => setContentNote(e.target.value)}
                value={contentNote}
                placeholder="content...."
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {isUpdateMode ? (
                <Button type="submit" variant="primary">
                  {isLoading ? <span className="loader"></span> : "Update Note"}
                </Button>
              ) : (
                <Button type="submit" variant="primary">
                  {isLoading ? <span className="loader"></span> : "Add Note"}
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

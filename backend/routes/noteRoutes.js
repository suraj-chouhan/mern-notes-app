const express = require("express");

const router = express.Router();

const { getNotes, addNote, deleteNote, updateNote } = require("../controllers/noteController");

router.get("/notes" , getNotes);

router.post("/note" , addNote);

router.delete("/note/:id", deleteNote);

router.put("/note/:id",updateNote)

module.exports = router;
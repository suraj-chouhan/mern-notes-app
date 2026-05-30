import React, { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App(){
   const [editingNote , setEditingNote] = useState(null);
	return(
		<div className="min-h-screen bg-gray-100 p-6">

         <div className="max-w-3xl mx-auto">

            <h1 className="text-4xl font-bold text-center mb-8">
               MERN Notes App
            </h1>

            <NoteForm editingNote = {editingNote} setEditingNote = {setEditingNote} />

            <NoteList editingNote = {editingNote} setEditingNote = {setEditingNote} />

         </div>

      </div>
	);
}

export default App;
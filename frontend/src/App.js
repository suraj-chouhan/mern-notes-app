import React, { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App(){
   const [editingNote , setEditingNote] = useState(null);
   const [refresh, setRefresh] = useState(false);
	return(
		<div className="min-h-screen bg-gray-100 p-6">

         <div className="max-w-3xl mx-auto">

            <h1 className="text-4xl font-bold text-center mb-8">
               MERN Notes App
            </h1>

            <NoteForm setRefresh={setRefresh} editingNote = {editingNote} setEditingNote = {setEditingNote} />

            <NoteList refresh={refresh} editingNote = {editingNote} setEditingNote = {setEditingNote} />

         </div>

      </div>
	);
}

export default App;
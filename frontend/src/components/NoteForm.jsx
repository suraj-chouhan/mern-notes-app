import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../api/api";

function NoteForm({editingNote , setEditingNote, setRefresh } ){
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	
	const handleSubmit = async (e)=>{
		e.preventDefault();
		
		if(!title.trim() || !content.trim())
		{
			setError("All fields are required");
			return;
		}
		if(title.length < 3)
		{
			setError("Title must be at least 3 characters");
			return;
		}
		if(content.length < 5)
		{
			setError("Content must be at least 5 characters");
			return;
		}
		try{
			if(editingNote){
				setError("");
				setLoading(true);
				await axios.put(`${API_URL}/note/${editingNote._id}`,{
					title,
					content
				})
				toast.success("Note Updated");
				setEditingNote(null);
				setTitle("");
				setContent("");
				setLoading(false);
				setRefresh(prev => !prev);

			}else{
				setError("");
				setLoading(true);
				await axios.post(API_URL+"/note", {
					title,
					content
				});
				toast.success("Note Added");
				setTitle("");
				setContent("");
				setLoading(false);
				setRefresh(prev => !prev);
			}
			
		}catch(error){
	
			console.log(error);
			setError("Error adding note");
		}
	};
	useEffect(()=>{
		if(editingNote){
			setTitle(editingNote.title || "");
			setContent(editingNote.content || "");
		}
	},[editingNote]);
	return(
		
		<form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-6">
		<h2 className="text-center">Add Note</h2>
			{
				error && <p className="text-center text-red-600">{error}</p>
			}
         <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded mb-4"
         />
		 <p className="text-right">{content.length}/200</p>
         <textarea
            placeholder="Enter content" maxLength={200}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-3 rounded mb-4"
         />
		 
		
         <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded"
         >
            {
					loading ? "Adding..." : editingNote ? "Update Note" : "Add Note"
			}
         </button>

      </form>
	);
}

export default NoteForm;
import React,{ useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../api/api";

function NoteList({editingNote , setEditingNote}){
	const [notes, setNotes ] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");

	const fetchNotes = async ()=>
	{	
		try{
		
			const res = await axios.get(API_URL+"/api/notes");
			setNotes(res.data.data);
			setLoading(false);
		}catch(error)
		{
			console.log(error);
		}
		
	};
	
	const handleDelete = async(id) =>{
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this note?"
		);

		if (!confirmDelete) return;
		try{
			
			await axios.delete(API_URL+"/note/"+id);
			toast.success("Note Deleted");
			fetchNotes();
			
		}catch(error){
			console.log(error);
		}
	}

	const filteredNotes = notes.filter((note)=>{
		if(!search) 
		{
				return true;
		}
		return(
				note.title.toLowerCase().includes(search.toLowerCase())
		);
	});

	useEffect(()=>{
		fetchNotes();
	},[]);

	if(loading)
	{
		return(
			<h2>
				Loading...
			</h2>
		);
	}

	return(
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

				<div>
					<h2 className="bg-white p-5 rounded-xl shadow mb-4 font-bold">
						All Notes
					</h2>
				</div>

				<div>
					<h2 className="bg-white p-5 rounded-xl shadow mb-4 font-bold">
						<input onChange={(e)=>{setSearch(e.target.value)}} value={search} className="w-full  rounded" placeholder="Search notes..." />
					</h2>
				</div>

			</div>
			{
				Array.isArray(notes) && notes.length > 0 ? (
					filteredNotes.map((note) => (
					<div className="bg-white p-5 rounded-xl shadow mb-4 border-2 border-white" style={{borderColor:"white"}} key={note._id}>
						<h3 className="text-2xl font-semibold">{note.title}</h3>
						<p className="mt-2 text-gray-700">{note.content}</p>
						<button className={`mt-4 px-4 py-2 rounded text-white ${editingNote?._id === note._id ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"
						}`} onClick={() => handleDelete(note._id)} disabled={editingNote?._id === note._id}
						>Delete</button>
						<button className="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> setEditingNote(note)}>
							Edit
						</button>
					</div>
					))
				) : (
					<p>No notes available.</p>
				)
			}

		</div>
	);
}

export default  NoteList;
const mongoose = require("mongoose");
const Note = require("../models/Note");

const getNotes = async(req,res)=>{
	try{
		const notes = await Note.find().sort({ createdAt:-1 });
		res.status(200).json({
			success: true,
			count: notes.length,
			data: notes
		});
	}catch(error){
		res.status(500).json({message : "Error fetching notes"});
	}
};

const addNote = async(req ,res)=>{
	try{
		const { title, content } = req.body;
		if(!title || !content)
		{
			return res.status(400).json({message:"Title and Content is required"});
		}
		const newnote = new Note({ title , content });
		await newnote.save();
		res.status(201).json({success:true,message: "Note saved", data:newnote});
	}catch(error){
		res.status(500).json({message:"Error adding note"});
	}
};

const deleteNote = async(req,res) =>{
	try{
			const id = req.params.id;
			
			if(!mongoose.Types.ObjectId.isValid(id))
			{
				return res.status(401).json({
					success:false,
					message:"Invalid id"
				});
			}
			
			const deletedNote = await Note.findByIdAndDelete(id);

			if(!deletedNote)
			{
				return res.status(404).json({
					success:false,
					message:"Note not found"
				});
			}
			res.status(200).json({
				success:true,
				message:"Note Deleted"
			});
	}catch(error){
		res.status(500).json({
			success:false,
			message:"error deleting note"
		});
	}
};

const updateNote = async (req,res)=>{
	try{
			const id = req.params.id;
			const {title , content} = req.body;
			if(!title || !content)
			{
				return res.status(400).json({message:"Title and content is required."})
			}
			const  updatedNote = await Note.findByIdAndUpdate(
				id,
				req.body,
				{ new:true }
			);
			if(!updatedNote)
			{
				return res.status(404).json({message:"Note not found"})
			}
			res.status(200).json({message:"Note updated",data:updatedNote});
	}catch(error){
		res.status(500).json({message:"Update error"});
	}
}

module.exports = {
	getNotes,
	addNote,
	deleteNote,
	updateNote
}
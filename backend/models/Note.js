const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	title : {
		type:String,
		required : [true, "Title is required"],
		trim : true,
		minlength: [3, "Title must be at least 3 characters"],
		maxlength: [100,"Title is too long"]
	},
	content: {
		type:String,
		required: [true,"content is required"],
		trim : true,
		minlength : [5, "content must be at least 5 characters"]
	}
}, {timestamps : true});

module.exports = mongoose.model("Note",noteSchema);
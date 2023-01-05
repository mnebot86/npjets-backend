import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const teamMomSchema = new Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
			required: [true, 'Please provide a name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please provide a last name'],
		},
		picture: {
			type: String,
			required: [true, 'Please provide image url'],
		},
		group: {
			type: mongoose.Types.ObjectId,
			ref: 'Group',
		},
		phone: {
			type: String,
			required: true,
		},
		cleanBGC: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const teamMomModel = model('TeamMom', teamMomSchema);

export default teamMomModel;

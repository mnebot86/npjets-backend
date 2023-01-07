import mongoose from 'mongoose';
const { Schema, model } = mongoose;
//TODO: Added Group ID

const coachSchema = new Schema(
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
		position: {
			type: String,
			enum: [
				'HeadCoach',
				'Offensive Coordinator',
				'Defensive Coordinator',
				'Assistant Coach',
			],
			required: true,
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

const coachModel = model('Coach', coachSchema);

export default coachModel;

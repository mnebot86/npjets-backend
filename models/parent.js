import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const parentSchema = new Schema(
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
		children: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Player',
			},
		],
		phone: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const parentModel = model('Parent', parentSchema);

export default parentModel;

import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Please provide an email'],
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
		},
		roleType: {
			type: String,
			enum: ['Admin', 'Coach', 'TeamMom', 'Parent', 'Player'],
			default: 'Player',
		},
	},
	{ timestamps: true }
);

const userModel = model('User', userSchema);

export default userModel;

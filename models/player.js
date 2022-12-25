import mongoose from 'mongoose';
const { Schema, model } = mongoose;
//TODO Add Parent Field

const playerSchema = new Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		isCaptain: {
			type: Boolean,
			default: false,
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
			required: [true, 'Please provide a image url'],
		},
		jerseyNumber: {
			type: Number,
			default: 1,
			min: 0,
			max: 99,
		},
		positions: {
			type: [String],
			enum: [
				'N/A',
				'QB',
				'WR',
				'RB',
				'TE',
				'K',
				'DB',
				'LB',
				'DT',
				'DE',
				'CB',
				'S',
			],
			default: 'N/A',
		},
		weight: {
			type: Number,
			required: [true, 'Please provide child weight'],
		},
		isStriper: {
			type: Boolean,
			default: false,
		},
		birthday: {
			type: String,
			required: [true, 'Please provide a birthday'],
		},
		age: {
			type: Number,
			required: [true, 'Please provide age'],
		},
		grade: {
			type: Number,
			required: [true, 'Please provide school grade level'],
		},
		group: {
			type: mongoose.Types.ObjectId,
			ref: 'Group',
		},
		registrationPaid: {
			type: Boolean,
			default: false,
		},
		fundraiserCompleted: {
			type: Boolean,
			default: false,
		},
		receivedGear: {
			type: Boolean,
			default: false,
		},
		returnedGear: {
			type: Boolean,
			default: false,
		},
		hasAllergy: {
			type: Boolean,
			default: false,
		},
		allergyList: {
			type: [String],
		},
		totalAbsence: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const playerModel = model('Player', playerSchema);

export default playerModel;

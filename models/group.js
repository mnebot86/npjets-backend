import mongoose from 'mongoose';
const { Schema, model } = mongoose;
//TODO: Added Roster ID
//TODO: Added Roster Size

const coachLimit = (value) => {
	return value.length <= 5;
};

const groupSchema = new Schema(
	{
		name: {
			type: String,
			enum: [
				'Varsity',
				'Junior Varsity',
				'Peewee',
				'Junior Peewee',
				'Flag',
			],
			required: [true, 'Please provide a name'],
		},
		coaches: {
			type: [
				{
					type: mongoose.Types.ObjectId,
					ref: 'Coach',
				},
			],
			validate: [coachLimit, 'Max number of {coaches}'],
		},
		teamMom: {
			type: mongoose.Types.ObjectId,
			ref: 'TeamMom',
		},
		ageAllowance: {
			type: Number,
			required: [true, 'Please provide age range'],
		},
		wins: {
			type: Number,
			default: 0,
		},
		loses: {
			type: Number,
			default: 0,
		},
		draws: {
			type: Number,
			default: 0,
		},
		ranking: {
			type: Number,
			default: 0,
		},
		isInPlayoff: {
			type: Boolean,
			default: false,
		},
		games: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Game',
			},
		],
		isArchive: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const groupModel = model('Group', groupSchema);

export default groupModel;

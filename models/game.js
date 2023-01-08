import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const gameSchema = new Schema(
	{
		group: {
			type: mongoose.Types.ObjectId,
			ref: 'Group',
		},
		homeTeam: {
			type: String,
			required: true,
		},
		visitingTeam: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		homeScore: {
			type: Number,
			default: 0,
		},
		visitingScore: {
			type: Number,
			default: 0,
		},
		location: {
			type: String,
			required: true,
		},
		winner: {
			type: String,
		},
		isPlayOffGame: {
			type: Boolean,
			default: false,
		},
		isChampionship: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const gameModel = model('Game', gameSchema);

export default gameModel;

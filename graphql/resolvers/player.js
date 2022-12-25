import Player from '../../models/player.js';
import { playerObject } from '../../utils/objectHelper.js';

const playerResolver = {
	deletePlayer: async (args) => {
		const { playerId } = args;

		const player = await Player.findByIdAndDelete(playerId);

		return playerObject(player, 'Deleted');
	},
	updatePlayer: async (args) => {
		const { playerId, playerInput } = args;

		const player = await Player.findByIdAndUpdate(
			playerId,
			{
				...playerInput,
			},
			{ new: true }
		);

		return playerObject(player);
	},
	player: async (playerId) => {
		const player = await Player.findOne({ playerId });

		if (!player) {
			throw new Error(`Player with id ${playerId} not found`);
		}

		return playerObject(player);
	},
	players: async () => {
		const players = await Player.find();

		if (!players) {
			throw new Error('No players exist');
		}

		return players.map((player) => {
			return playerObject(player);
		});
	},
	createPlayer: async (args) => {
		const { name, lastName, allergyList } = args.playerInput;

		try {
			const playerAlreadyExist = await Player.findOne({
				name: name.charAt(0).toUpperCase() + name.slice(1),
				lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
			});

			if (playerAlreadyExist) {
				throw new Error(`${name} ${lastName} team exist already`);
			}

			const player = new Player({
				...args.playerInput,
				name: name.charAt(0).toUpperCase() + name.slice(1),
				lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
				allergyList: [allergyList],
			});

			await player.save();

			return playerObject(player);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default playerResolver;

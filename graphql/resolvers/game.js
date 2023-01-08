import Game from '../../models/game.js';
import Group from '../../models/group.js';
import { gameObject } from '../../utils/objectHelper.js';

const gameResolver = {
	games: async () => {
		const games = await Game.find();

		if (!games) {
			throw new Error('No games exist');
		}

		return games.map((game) => {
			return gameObject(game);
		});
	},
	createGame: async (args) => {
		const { group, homeTeam, visitingTeam, date, time, location } =
			args.gameInput;

		if (
			!group ||
			!homeTeam ||
			!visitingTeam ||
			!date ||
			!time ||
			!location
		) {
			throw new Error('Please provide credential');
		}

		try {
			const gameAlreadyExist = await Game.findOne({
				homeTeam,
				visitingTeam,
				date,
				time,
			});

			if (gameAlreadyExist) {
				throw new Error('This game exist already');
			}

			const game = new Game({ ...args.gameInput });

			const result = await game.save();

			const groupRef = await Group.findOne({ _id: group });

			groupRef.games.push(result._doc._id);

			await groupRef.save();

			return gameObject(result);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default gameResolver;

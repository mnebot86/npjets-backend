import Coach from '../../models/coach.js';
import User from '../../models/user.js';
import { coachObject } from '../../utils/objectHelper.js';

const coachResolver = {
	deleteCoach: async (args) => {
		const { coachId } = args;

		const coach = await Coach.findByIdAndDelete(coachId);

		return coachObject(coach, 'Deleted!');
	},
	updateCoach: async (args) => {
		const { coachId, coachInput } = args;

		const coach = await Coach.findByIdAndUpdate(
			coachId,
			{
				...coachInput,
			},
			{ new: true }
		);

		return coachObject(coach);
	},
	coach: async (coachId) => {
		const coach = await Coach.findOne(coachId);

		if (!coach) {
			throw new Error(`No Coach with id ${coachId}`);
		}

		return coachObject(coach);
	},
	coaches: async () => {
		const coaches = await Coach.find();

		return coaches.map((coach) => {
			return coachObject(coach);
		});
	},
	createCoach: async (args) => {
		const { name, lastName, picture, position, phone, cleanBGC, user } =
			args.coachInput;

		if (
			!name ||
			!lastName ||
			!picture ||
			!position ||
			!phone ||
			!cleanBGC ||
			!user
		) {
			throw new Error('Please provide credential');
		}

		try {
			const coachAlreadyExist = await Coach.findOne({
				name: name.charAt(0).toUpperCase() + name.slice(1),
				lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
			});

			if (coachAlreadyExist) {
				throw new Error(`${name} ${lastName} exist already`);
			}

			const coach = new Coach({
				name: name.charAt(0).toUpperCase() + name.slice(1),
				lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
				picture,
				phone,
				position,
				cleanBGC,
				user,
			});

			const result = await coach.save();

			await User.findByIdAndUpdate(user, {
				role: result._id,
			});

			return coachObject(result);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default coachResolver;

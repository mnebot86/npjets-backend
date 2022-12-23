import Coach from '../../models/coach.js';
import User from '../../models/user.js';

const userHelper = async (userId) => {
	const user = await User.findById(userId);

	if (!user) {
		throw new Error(`No user found with id ${userId}`);
	}

	return { ...user._doc };
};

const coachResolver = {
	deleteCoach: async (args) => {
		const { coachId } = args;

		const coach = await Coach.findByIdAndDelete(coachId);

		return {
			...coach._doc,
			user: userHelper(coach.user),
		};
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

		return {
			...coach._doc,
			user: userHelper(coach.user),
		};
	},
	coach: async (coachId) => {
		const coach = await Coach.findOne(coachId);

		console.log('Testing', coach);

		if (!coach) {
			throw new Error(`No Coach with id ${coachId}`);
		}
		console.log({ coachId });

		return {
			...coach._doc,
			user: userHelper(coach.user),
		};
	},
	coaches: async () => {
		const coaches = await Coach.find();

		return coaches.map((coach) => {
			return {
				...coach._doc,
				user: userHelper(coach.user),
			};
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

			return { ...result._doc, user: userHelper(result.user) };
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default coachResolver;

import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

const userResolver = {
	createUser: async (args) => {
		const { email, password, roleType } = args.userInput;

		if (!email || !password) {
			throw new Error('Please provide credential');
		}

		try {
			const userAlreadyExist = await User.findOne({
				email,
			});

			if (userAlreadyExist) {
				throw new Error(`${email} exist already`);
			}

			const hashPassword = await bcrypt.hash(password, 15);

			const user = new User({
				email,
				password: hashPassword,
				roleType,
			});

			const result = await user.save();

			return { ...result._doc, password: null };
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	users: async () => {
		try {
			const users = await User.find();

			return users.map((user) => {
				return { ...user._doc };
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default userResolver;

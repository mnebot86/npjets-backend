import Parent from '../../models/parent.js';
import User from '../../models/user.js';
import { parentObject } from '../../utils/objectHelper.js';

const parentResolver = {
	deleteParent: async (args) => {
		const { parentId } = args;

		const parent = await Parent.findByIdAndDelete(parentId);

		return parentObject(parent, 'Deleted');
	},
	updateParent: async (args) => {
		const { parentId, parentInput } = args;

		const parent = await Parent.findByIdAndUpdate(
			parentId,
			{
				...parentInput,
			},
			{ new: true }
		);

		return parentObject(parent);
	},
	parent: async (parentId) => {
		const parent = await Parent.findOne({ parentId });

		if (!parent) {
			throw new Error(`Player with id ${parentId} not found`);
		}

		return parentObject(parent);
	},
	parents: async () => {
		const parents = await Parent.find();

		if (!parents) {
			throw new Error('No parents exist');
		}

		return parents.map((parent) => {
			return parentObject(parent);
		});
	},
	createParent: async (args) => {
		const { name, lastName, picture, phone, user } = args.parentInput;

		if (!name || !lastName || !picture || !phone || !user) {
			throw new Error('Please provide credential');
		}

		try {
			const parentAlreadyExist = await Parent.findOne({
				name: name.charAt(0).toUpperCase() + name.slice(1),
				lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
			});

			if (parentAlreadyExist) {
				throw new Error(`${name} ${lastName} exist already`);
			}

			const parent = new Parent({
				name: name.charAt(0).toUpperCase() + name.slice(1),
				lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
				picture,
				phone,
				user,
			});

			const result = await parent.save();

			await User.findByIdAndUpdate(user, {
				role: result._id,
			});

			return parentObject(result);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default parentResolver;

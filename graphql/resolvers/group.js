import Group from '../../models/group.js';

const groupResolver = {
	deleteGroup: async (args) => {
		const { groupId } = args;

		const group = await Group.findByIdAndDelete(groupId);

		return {
			...group._doc,
			createdAt: new Date(group._doc.createdAt).toISOString(),
			message: 'Deleted',
		};
	},
	updateGroup: async (args) => {
		const { groupId, groupInput } = args;

		const group = await Group.findByIdAndUpdate(
			groupId,
			{
				...groupInput,
			},
			{ new: true }
		);

		return {
			...group._doc,
			createdAt: new Date(group._doc.createdAt).toISOString(),
		};
	},
	group: async (groupId) => {
		const group = await Group.findOne(groupId);

		if (!group) {
			throw new Error(`No Group with the id of ${groupId}`);
		}

		return {
			...group._doc,
			createdAt: new Date(group._doc.createdAt).toISOString(),
		};
	},
	groups: async () => {
		const groups = await Group.find();

		if (!groups) {
			throw new Error('No teams exist');
		}

		return groups.map((group) => {
			return {
				...group._doc,
				createdAt: new Date(group._doc.createdAt).toISOString(),
			};
		});
	},
	createGroup: async (args) => {
		const { name } = args.groupInput;

		try {
			const groupAlreadyExist = await Group.findOne({
				name,
			});

			if (groupAlreadyExist) {
				throw new Error(`${name} team exist already`);
			}

			const group = new Group({
				...args.groupInput,
			});

			const result = await group.save();

			console.log('TEST', { group });

			return {
				...result._doc,
				createdAt: new Date(result._doc.createdAt).toISOString(),
			};
		} catch (error) {
			console.log({ error });
			throw error;
		}
	},
};

export default groupResolver;

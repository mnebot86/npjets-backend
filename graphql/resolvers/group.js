import Group from '../../models/group.js';
import { groupObject } from '../../utils/objectHelper.js';

const groupResolver = {
	deleteGroup: async (args) => {
		const { groupId } = args;

		const group = await Group.findByIdAndDelete(groupId);

		return groupObject(group, 'Deleted!');
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

		return groupObject(group);
	},
	group: async (groupId) => {
		const group = await Group.findOne(groupId);

		if (!group) {
			throw new Error(`No Group with the id of ${groupId}`);
		}

		return groupObject(group);
	},
	groups: async () => {
		const groups = await Group.find();

		if (!groups) {
			throw new Error('No teams exist');
		}

		return groups.map((group) => {
			return groupObject(group);
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

			return groupObject(result);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	},
};

export default groupResolver;

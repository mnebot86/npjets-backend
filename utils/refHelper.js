import User from '../models/user.js';
import Group from '../models/group.js';

export const userRef = async (userId) => {
	const user = await User.findById(userId);

	if (!user) {
		throw new Error(`No user found with id ${userId}`);
	}

	return { ...user._doc };
};

export const groupRef = async (groupId) => {
	const group = await Group.findById(groupId);

	if (!group) {
		throw new Error(`No group found with id ${groupId}`);
	}

	return { ...group._doc };
};

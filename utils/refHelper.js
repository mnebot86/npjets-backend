import User from '../models/user.js';
import Group from '../models/group.js';
import Player from '../models/player.js';

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

export const playersRef = async (children) => {
	const player = await Player.find({ _id: children });

	console.log({ player });

	return player;
};

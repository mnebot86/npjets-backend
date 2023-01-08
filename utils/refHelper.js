import User from '../models/user.js';
import Group from '../models/group.js';
import Player from '../models/player.js';
import TeamMom from '../models/teamMom.js';
import Game from '../models/game.js';

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

export const gamesRef = async (groupId) => {
	console.log({ groupId });
	const games = await Game.find({ _id: groupId });
	console.log({ games });

	return games;
};

export const teamMomRef = async (teamMomId) => {
	const teamMom = await TeamMom.findById(teamMomId);

	if (!teamMom) {
		throw new Error(`No Team mom with id ${teamMomId}`);
	}
};

export const playersRef = async (children) => {
	const player = await Player.find({ _id: children });

	return player;
};

import { dateHelper } from '../utils/dateHelper.js';
import { userRef, groupRef } from '../utils/refHelper.js';

export const playerObject = (player, message) => {
	return {
		...player._doc,
		user: userRef(player._doc.user),
		group: groupRef(player._doc.group),
		createdAt: dateHelper(player._doc.createdAt),
		message: message,
	};
};

export const coachObject = (coach, message) => {
	return {
		...coach._doc,
		user: userRef(coach.user),
		message: message,
	};
};

export const groupObject = (group, message) => {
	return {
		...group._doc,
		createdAt: new Date(group._doc.createdAt).toISOString(),
		message: message,
	};
};

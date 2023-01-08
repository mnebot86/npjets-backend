import { dateHelper } from '../utils/dateHelper.js';
import {
	userRef,
	groupRef,
	playersRef,
	gamesRef,
	teamMomRef,
} from '../utils/refHelper.js';

export const playerObject = (player, message) => {
	return {
		...player._doc,
		user: userRef(player._doc.user),
		group: groupRef(player._doc.group),
		createdAt: dateHelper(player._doc.createdAt),
		message,
	};
};

export const coachObject = (coach, message) => {
	return {
		...coach._doc,
		user: userRef(coach.user),
		group: groupRef(coach._doc.group),
		message,
	};
};

export const groupObject = (group, message) => {
	return {
		...group._doc,
		games: gamesRef(group._doc.games),
		teamMom: teamMomRef(group._doc.teamMom),
		createdAt: new Date(group._doc.createdAt).toISOString(),
		message,
	};
};

export const teamMomObject = (teamMom, message) => {
	return {
		...teamMom._doc,
		user: userRef(teamMom._doc.user),
		group: groupRef(teamMom._doc.group),
		message,
	};
};

export const parentObject = (parent, message) => {
	return {
		...parent._doc,
		user: userRef(parent._doc.user),
		children: playersRef(parent._doc.children),
		message,
	};
};

export const gameObject = (game, message) => {
	return {
		...game._doc,
		group: groupRef(game._doc.group),
		message,
	};
};

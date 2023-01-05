import userResolver from './user.js';
import coachResolver from './coach.js';
import groupResolver from './group.js';
import playerResolver from './player.js';
import teamMomResolver from './teamMom.js';

const rootResolver = {
	...userResolver,
	...coachResolver,
	...groupResolver,
	...playerResolver,
	...teamMomResolver,
};

export default rootResolver;

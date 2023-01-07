import userResolver from './user.js';
import coachResolver from './coach.js';
import groupResolver from './group.js';
import playerResolver from './player.js';
import teamMomResolver from './teamMom.js';
import parentResolver from './parent.js';

const rootResolver = {
	...userResolver,
	...coachResolver,
	...groupResolver,
	...playerResolver,
	...teamMomResolver,
	...parentResolver,
};

export default rootResolver;

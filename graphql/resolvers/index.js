import userResolver from './user.js';
import coachResolver from './coach.js';
import groupResolver from './group.js';
import playerResolver from './player.js';

const rootResolver = {
	...userResolver,
	...coachResolver,
	...groupResolver,
	...playerResolver,
};

export default rootResolver;

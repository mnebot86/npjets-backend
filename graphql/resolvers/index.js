import userResolver from './user.js';
import coachResolver from './coach.js';
import groupResolver from './group.js';

const rootResolver = {
	...userResolver,
	...coachResolver,
	...groupResolver,
};

export default rootResolver;

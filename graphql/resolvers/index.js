import userResolver from './user.js';
import coachResolver from './coach.js';

const rootResolver = {
	...userResolver,
	...coachResolver,
};

export default rootResolver;

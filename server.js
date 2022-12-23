import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';

dotenv.config();

//Constants
const app = express();
const port = process.env.PORT;
const mongoString =
	process.env.NODE_ENV !== 'production'
		? process.env.MONGOOSE_URL_DEV
		: process.env.MONGOOSE_URL_PRD;

//db and authenticateUser
import connectDB from './db/connect.js';

//Graphql
import rootResolver from './graphql/resolvers/index.js';
import schemaBuild from './graphql/schema/index.js';

//Middleware
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

//Routes
app.get('/api/v1', (req, res) => {
	res.json({
		msg: 'API is running',
	});
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schemaBuild,
		rootValue: rootResolver,
		graphiql: true,
	})
);

const start = async () => {
	try {
		await connectDB(mongoString);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();

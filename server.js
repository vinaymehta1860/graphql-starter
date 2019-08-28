const express = require('express'),
	cors = require('cors'),
	MongoCLient = require('mongodb').MongoClient,
	expressGraphQL = require('express-graphql'),
	schema = require('./graphql/schema'),
	bodyParser = require('body-parser');

const app = express();

const router = express.Router();

const mongoURL = 'mongodb://localhost:27017',
	dbName = 'graphql-starter',
	client = new MongoCLient(mongoURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
let db;

client.connect(async err => {
	if (err) {
		console.log(
			'There was an error while connecting to database. Error: ',
			err
		);
	} else {
		db = await client.db(dbName);
		console.log(`Successfully connected to ${dbName} database. ENJOY..!!`);
	}
});

app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true
	})
);

app.use((req, res, next) => {
	cors();
	next();
});

app.listen(3002, () => {
	console.log('Server running on port 3002.');
});

router.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
	res.send({
		success: true,
		message: 'Router working.'
	});
});

// Test route
app.get('/getCollections', async (req, res) => {
	const people = await client
		.db(dbName)
		.collection('persons')
		.find({})
		.toArray();

	res.send({
		success: true,
		data: {
			people
		}
	});
});

module.exports = {
	db
};

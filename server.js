const express = require('express'),
	cors = require('cors'),
	expressGraphQL = require('express-graphql'),
	mongoose = require('mongoose'),
	schema = require('./graphql/schema'),
	bodyParser = require('body-parser');

const app = express();

const router = express.Router();

mongoose.set('useCreateIndex', true);
mongoose
	.connect('mongodb://localhost/graphql_starter', {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(
		function() {
			//Successfull connection to mongoDB database.
			console.log('Successfully connected to MongoDB Database.');
		},
		function(err) {
			//Error while connecting to MongoDB database.
			console.log(err);
		}
	);

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

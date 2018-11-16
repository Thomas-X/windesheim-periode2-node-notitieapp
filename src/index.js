import bodyParser from 'body-parser';
import chalk from 'chalk';
import express from 'express';
import {Server as HttpServer} from 'http';
import ip from 'ip';
import {error, info, warn} from './services/log';
import Home from "./controllers/home";

require('dotenv').config();

class Server {
	app;
	port;

	constructor() {
		this.app = express();
		this.port = process.env.PORT || 9322;
		this.start();
	}

	onListen = (err) => {
		if (err) {
			error(`Unable to start server on port ${this.port}`, err);
			return;
		}

		if (process.env.__DEV__) {
			warn('We\'re in development mode.');
		}

		info(`We're live.\r\n`);
		info(chalk`{bold On your network:}     {underline http://${ip.address('public')}:{bold ${this.port.toString()}}/}`);
		info(chalk`Local:               {underline http://${ip.address('private')}:{bold ${this.port.toString()}}/}`);
	};

	start = async () => {
		this.app.use(bodyParser({
			urlencoded: true
		}));
		this.app.use(express.static('public'));
		this.app.set('view engine', 'pug');
		this.setRoutes();
		const http = new HttpServer(this.app);
		http.listen(this.port, this.onListen);
	};

	setRoutes = () => {
		this.app.use('/', Home);
	};
}

export default new Server();
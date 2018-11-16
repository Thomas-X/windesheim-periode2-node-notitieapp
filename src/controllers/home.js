import {Router} from 'express';
import fs from 'fs';
import path from 'path';
import sanitize_filename from 'sanitize-filename';


const Home = Router();
const notesFolderPath = path.join(__dirname, '../../', 'notes');

const html_template = (content) => `
<div>
<h1>${content}</h1>

</div>

<a href="/">Go to home</a>
`;


Home.get('/', (req, res) => {
	let files= fs.readdirSync(notesFolderPath);
	files = files.map((val, idx) => val.split('.html')[0]);
	res.render('home', {title: 'Home', files})
});

Home.get('/notes/create', (req, res) => {
	res.render('notes_create', {title: 'Create note'})
});

Home.get('/notes/:name', (req, res) => {
	const note = fs.readFileSync(path.join(notesFolderPath, req.params.name + '.html'), 'utf8');
	res.send(note);
});

Home.post('/notes/create', (req, res) => {
	fs.appendFileSync(path.join(notesFolderPath, sanitize_filename(req.body.name)+ '.html'), html_template(req.body.content));
	res.redirect('/');
});

export default Home;
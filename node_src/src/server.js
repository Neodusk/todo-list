'use strict';

/*------------------------INIT CONSTs-----------------------------*/
const express = require('express'),
bodyParser= require('body-parser'),
datab = require('./connect'),
PORT = 8080,
HOST = '0.0.0.0',
cors= require("cors"),
app = express(),
Do = datab.Do;
/*---------------END INIT CONSTs, BEGIN APP USE-------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/*--------------------------END APP USE----------------------------*/

/* setUpdate updates the database with the given req.body.name and 
 * req.body.done where id = req.body.id
 * @param req, the req object
 */
async function setUpdate(req) {
	await Do.update({ name: req.body.name, done:  req.body.done, }, {
		where: {
		  id: req.body.id
		}
	  });
}

/* addItem creates an item in the database
 * @param req, the req object
 */
async function addItem(req) {
  await Do.create({ name: req.body.name, done: req.body.done});
}

/* router for '/'
 * queries databate and sends the response
 */
app.get('/',(req, res) => {
	Do.findAll({attributes: ['id', 'name', 'done']}).then( data => {
		res.json(data);
	}
	).catch(error => {
		res.json(error);
	});
});

/* router for '/delete'
 * calls setUpdate
 */
app.post('/delete', (req) => {
	setUpdate(req);
})

/* router for '/add'
 * calls addItem
 */
app.post('/add', (req) => {
  addItem(req);
})

/* router for '/delete'
 * calls setUpdate
 */
app.post('/edit', (req,res) => {
	setUpdate(req);
})

/* listen to PORT and HOST
 * then sync table
 */
app.listen(PORT, HOST, () => {
	Do.sync({force: true});
});
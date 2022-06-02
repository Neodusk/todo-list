const Sequelize = require("sequelize");

console.log(process.env.PASS);
const sequelize = new Sequelize('db1', 'root', process.env.PASS || 'd@t@ONE556', {
	host: process.env.DBHOST || '0.0.0.0', dialect: 'mariadb'
});

const Do = sequelize.define('todoLists', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	done: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
})

try {
	sequelize.authenticate();
	console.log("Connection established");
} catch(error) {
	console.log('Unable to connect', error);
}

exports.Do = Do;
exports.sequelize = sequelize;
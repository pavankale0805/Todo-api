var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite', //which database to use
	'storage': __dirname +'/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({
	//force: true
}).then(function () {
	console.log('Everything is synched');

	Todo.findById(2).then(function (todo) {
		if(todo) {
			console.log(todo.toJSON());
		} else {
			console.log('Todo not found');
		}
	});

	/*Todo.create({
		description: 'Take out trash',
		//completed: false
	}).then(function (todo) {
		return Todo.create({
			description: 'Clean office'
		});
	}).then(function () {
		//return Todo.findById(1);
		return Todo.findAll({
			where: {
				//completed: false
				description: {
					$like: '%Office%'
				}
			}
		});
	}).then(function (todos) {
		if(todos) {
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			});
		} else{
			console.log('No todo found');
		}
	}).catch(function (e) {
		console.log(e);
	});*/
});

//{force: true} => Drop table if already exist. By default true.
//Id field is automatically created for each record. 
/*sequelize.sync({force: true}).then(function() {
	console.log('Everything is synched');

	Todo.create({
		description: 'Walking the dog',
		completed: false
	}).then(function(todo) {
		console.log('Finished!');
		console.log(todo);
	}).catch(function(e){
		console.log(e);  
	});
});*/
import db from '../../connector/DB';

class Person {

	getPerson = (obj, {id}, context, info) => {
		return db.get('persons')
			.filter({id})
			.first()
			.value();
	};

	getPersons = () => {
		return db.get('persons')
			.value()
	};

	createPerson = () => {

	};

	updatePerson = () => {

	};

	deletePerson = () => {

	}
}

// export as singleton
export default new Person();
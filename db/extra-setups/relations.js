function applyRelationsSetup(sequelize) {

	console.log('applyRelationsSetup', sequelize.models)
	
	const { User, Event } = sequelize.models
	

	User.belongsTo(User, {as: 'manager'})
	Event.belongsTo(User, {as: 'owner'})
}

module.exports = { applyRelationsSetup }
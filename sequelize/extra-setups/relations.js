function applyRelationsSetup(sequelize) {
	const { user } = sequelize.models

	user.hasMany(user)
	user.belongsTo(user, {foreignKey: 'managerUserId'})
}

module.exports = { applyRelationsSetup }
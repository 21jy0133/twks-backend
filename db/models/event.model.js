const { DataTypes } = require('sequelize')
const { Sequelize } = require("sequelize")

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const event = sequelize.define('Event', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
		},
		timestamp: {
			type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
		},
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data: {
			type: 'BYTEA'
		},
        dataJson: {
			type: DataTypes.JSON
		}
	})
    return event
}
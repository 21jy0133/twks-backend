const { DataTypes } = require('sequelize')
const { Sequelize } = require("sequelize")

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const user = sequelize.define('user', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
		},
		firstName: {
			type: DataTypes.STRING
		},
        lastName: {
			type: DataTypes.STRING
		},
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            lowercase: true,
            validate: {
              isEmail: true,
              notEmpty: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isZero: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
	})
    return user
}
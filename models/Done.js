const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Done extends Model {}

Done.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bucket_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'bucket',
                key: 'id'
            },
        },
        todo_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'todo',
                key: 'id'
            },
        },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'done'
}

);
module.exports = Done;
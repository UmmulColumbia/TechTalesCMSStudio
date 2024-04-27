const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');  // Ensure User model is imported

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,  // Reference the model, not the table name
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'post'
});

module.exports = Post;

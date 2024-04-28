const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = require('./User')(sequelize);  // Import the User model

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
            allowNull: false,
            references: {
                model: 'user',  // Ensure the table name is correct; this should match the table name exactly if you have custom settings like `freezeTableName: true`
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'post',
        tableName: 'post' // Explicitly define the table name if you want to override Sequelize's pluralization
    });

    return Post;
};

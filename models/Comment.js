const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Comment extends Model {}

    Comment.init(
        {
            // Define model attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true,  // ensures the comment text is not empty
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',  // Reference to the User model using its model name
                    key: 'id'
                }
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'post',  // Reference to the Post model using its model name
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            modelName: 'comment',
            timestamps: true,  // Automatically adds the createdAt and updatedAt timestamp fields
            freezeTableName: true,  // Prevents Sequelize from renaming the table
            underscored: true  // Uses underscores instead of camel-casing (i.e. `comment_text` instead of `commentText`)
        }
    );

    return Comment;
};

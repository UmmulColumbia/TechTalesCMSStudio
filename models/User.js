const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Check password method to verify user password at login
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10] 
    }
  }
}, {
  hooks: {
    // Automatically hash user password before saving the user model
    beforeCreate: async (userData) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      return userData;
    }
  },
  sequelize,
  timestamps: true, // Enable timestamps for created_at and updated_at
  modelName: 'user'
});

module.exports = User;

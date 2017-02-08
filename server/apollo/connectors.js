import Sequelize from 'sequelize';

const Conn = new Sequelize(
  'meteor_users',
  'root',
  'root',
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);

const Profile = Conn.define('profile', {
  userId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  birthday: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Conn.sync();

export default Conn;

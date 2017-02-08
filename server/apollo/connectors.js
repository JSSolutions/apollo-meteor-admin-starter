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

// const Person = Conn.define('person', {
//   username: {
//     type: Sequelize.STRING,
//     allowNull: true,
//     is: /^[a-z0-9A-Z_]{3,15}$/,
//   },
//   createdAt: {
//     type: Sequelize.DATE,
//     allowNull: false,
//   },
// });
//
// const Email = Conn.define('email', {
//   address: {
//     type: Sequelize.STRING,
//     validate: {
//       isEmail: true,
//     },
//   },
//   verified: {
//     type: Sequelize.BOOLEAN,
//   },
// });
//
// const Role = Conn.define('role', {
//   role: {
//     type: Sequelize.STRING,
//   }
// });



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

// relationships

// Person.hasOne(Profile);
// Profile.belongsTo(Person);
//
// Person.hasMany(Email);
// Email.belongsTo(Person);
//
// Person.hasMany(Role);
// Role.belongsTo(Person);

Conn.sync();

export default Conn;

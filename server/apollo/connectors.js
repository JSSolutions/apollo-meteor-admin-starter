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

/*
  // what is this?

 services:
 type: Object
 optional: true
 blackbox: true
 */

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

/*
  // need to save pictures somewhere
 picture:
 type: String
 optional:true
 label: 'Profile picture'
 autoform:
 afFieldInput:
 type: 'fileUpload'
 collection: 'ProfilePictures'

 */

const Profile = Conn.define('profile', {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
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

Conn.sync({ force: true }).then(() => {
  Profile.create({
    userId: '1',
    firstName: 'Paul The Firtst',
  })
});

export default Conn;

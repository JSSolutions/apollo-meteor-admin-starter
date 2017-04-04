Apollo + meteor-starter demo
==============

A Meteor + Apollo integration for working with user profile saved in MySQL db.

Forked from [yogiben/meteor-starter](https://github.com/yogiben/meteor-starter)

### Setup ####

```
git clone https://github.com/JSSolutions/apollo-meteor-admin-starter.git myapp
cd myapp
meteor npm i
npm start

```
Don't forget to run mysql

### Configuration ###

1) Set your MySQL parameters in settings.json file in the root folder

### Disclamer ###

- this code is not suitable for production and can be used as a demo
- calling graphQL queries is not optimized and can be redundant
- data gets saved both to MySQL and Mongo
- profile birthday not working - some bug in autoform or meteor-admin while saving
- after changing profile SimpleSchema you should change Sequelize.js
model in connectors.js and make relative changes in ```Input type``` in schema.js

### Improvements ###
- use observables in graphQL client
- define relationships between SimpleSchema and Sequelize.js model
- use dataIdFromObject in apollo client for correct caching

-------------

Made by [![Custom Software Development Company](https://s3-eu-west-1.amazonaws.com/jssolutions/github/jss_xs.png)](http://jssolutionsdev.com/?github=Databazel) - [Custom Software Development Company](http://jssolutionsdev.com/?github=Databazel)

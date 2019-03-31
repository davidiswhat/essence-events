//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: process.env.PORT ? 'mongodb://admin:password123@ds119755.mlab.com:19755/essence-events-stable' : 'mongodb://admin:password123@ds117806.mlab.com:17806/essence-events-test', //place the URI of your mongo database here.
  },  
  port: process.env.PORT ? process.env.PORT : 8080
};

//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://admin:password123@ds111025.mlab.com:11025/wso-bootcamp4', //place the URI of your mongo database here.
  }, 
  port: process.env.PORT
};
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore')
  , authTypes = ['github', 'twitter', 'facebook', 'google']

/**
 * User Schema
 */

var UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  provider: String,
  hashed_password: String,
  salt: String,
  facebook: {},
  twitter: {},
  github: {},
  google: {}
})

mongoose.model('User', UserSchema)

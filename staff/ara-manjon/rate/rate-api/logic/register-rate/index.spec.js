require('dotenv').config()
const { expect } = require('chai')
const registerRate = require('.')
const { database, models: { User,  } } = require('rate-data')
const express = require('express')
const bodyParser = require('body-parser')

const functions = require("firebase-functions");

const admin = require('firebase-admin')
admin.initializeApp()

const ingredienteApp = express()
ingredienteApp.use(bodyParser.json())
ingredienteApp.use(bodyParser.urlencoded())

const storageApp = express()
storageApp.use(bodyParser.json())
storageApp.use(bodyParser.urlencoded())

const ingredientFunctions = require('./features/ingredients')
const storageFunctions = require('./features/storages')

ingredienteApp.get('/:id', ingredientFunctions.getIngredient)
ingredienteApp.get('/', ingredientFunctions.getIngredients)
ingredienteApp.post('/', ingredientFunctions.addIngredient)

storageApp.post('/', storageFunctions.addStorage)
storageApp.get('/', storageFunctions.getStorages)
storageApp.get('/:id', storageFunctions.getStorage)
storageApp.put('/:id', storageFunctions.putStorage)

exports.ingredients = functions.https.onRequest(ingredienteApp)
exports.storages = functions.https.onRequest(storageApp)


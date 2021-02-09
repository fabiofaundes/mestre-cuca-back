const express = require('express')
const bodyParser = require('body-parser')

const functions = require("firebase-functions");

const admin = require('firebase-admin')
admin.initializeApp()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

const ingredientFunctions = require('./features/ingredients')

app.get('/:id', ingredientFunctions.getIngredient)
app.get('/', ingredientFunctions.getIngredients)
app.post('/', ingredientFunctions.addIngredient)

exports.ingredients = functions.https.onRequest(app)


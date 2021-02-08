const express = require('express')

const functions = require("firebase-functions");

const admin = require('firebase-admin')
admin.initializeApp()

exports.addMessage = functions.https.onRequest( async (req, res) => {
    const original = req.query.text

    const writeResult = await admin.firestore().collection('messages').add({original})

    res.json({result: `Message with ID ${writeResult.id} added.`})
})

exports.addIngredient = functions.https.onRequest((req, res) => {
    const { name } = req.query

    admin.firestore().collection('ingredientes').add({
        name,
        storage: {
            id: 'testId',
            name: 'Dispensa'
        },
        quantity: '500g',
        bestBefore: Date.now()
    })
    .then(writeResult => {
        res.json(`Added Ingrediente: ${JSON.stringify(writeResult)}`)
    })
    .catch(err => {
        res.status(500).send(JSON.stringify(err))
    })
})

const getIngredient = (req, res) => {
    const { id } = req.query

    admin.firestore().collection('ingredientes').doc(id).get()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).send(JSON.stringify(err))
    })
}

const getIngredients = (req, res) => {
    admin.firestore().collection('ingredientes').listDocuments()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).send(JSON.stringify(err))
    })
}

const app = express()

app.get('/:id', getIngredient)
app.get('/', getIngredients)

exports.ingredients = functions.https.onRequest(app)


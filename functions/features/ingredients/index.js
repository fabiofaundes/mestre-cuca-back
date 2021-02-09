const e = require('express')
const admin = require('firebase-admin')
const { standardErrorHandler } = require('../../common')

const ingredienteCollection = admin.firestore().collection('ingrediente')

const getIngredients = (_, res) => {
    ingredienteCollection.get()
    .then(querySnapshot => {

        res.json(querySnapshot.docs.map(doc => doc.data()))

    })
    .catch(standardErrorHandler(res))
}

const addIngredient = (req, res) => {
    const { name, bestBefore, quantity} = req.body
    const storage = {
        name: 'Dispensa',
        id: 'testId'
    }

    console.dir(req.body)

    ingredienteCollection.add({
        name,
        bestBefore: bestBefore || Date.now(),
        quantity,
        storage
    })
    .then(_ => {
        res.status(200).send('Ingredient successfully added.')
    })
    .catch(standardErrorHandler(res))
}

const getIngredient = (req, res) => {
    const { id } = req.params

    ingredienteCollection.doc(id).get()
    .then(documentSnapshot => {
        if(documentSnapshot.exists){
            const foundIngredient = documentSnapshot.data()

            res.json(foundIngredient)
        }
        else {
            res.status(404).send(`Couldn\'t find document with Id ${id}`)
        }     
    })
    .catch(err => {
        res.status(500).send(JSON.stringify(err))
    })
}

exports.getIngredients = getIngredients
exports.getIngredient = getIngredient
exports.addIngredient = addIngredient
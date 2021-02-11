const admin = require('firebase-admin')
const { standardErrorHandler } = require('../../common')

const storageCollection = admin.firestore().collection('storage')

const addStorage = (req, res) => {
    const { name } = req.body

    storageCollection.add({name})
    .then(_ => {
        res.status(200).send(`Novo armazém ${name} adicionado com sucesso.`)
    })
    .catch(standardErrorHandler(res))
}

const getStorage = (req, res) => {
    const { id } = req.params

    storageCollection.doc(id).get()
    .then(docSnapshot => {
        if(docSnapshot.exists) {
            const foundStorage = {
                ...docSnapshot.data(),
                id: docSnapshot.id
            }

            res.json(foundStorage)
        }
        else {
            res.status(404).send(`Armazém com o id ${id} não encontrado.`)
        }
    })
    .catch(standardErrorHandler(res))
}

const getStorages = (_, res) => {
    storageCollection.get()
    .then(querySnapshot => {

        const storagesList = querySnapshot.docs
            .map(doc => ({...doc.data(), id: doc.id}))

        res.json(storagesList)
    })
    .catch(standardErrorHandler(res))
}

const putStorage = (req, res) => {
    const { name } = req.body
    const { id } = req.params

    const storageRef = storageCollection.doc(id)

    storageRef.get()
    .then(docSnapshot => {
        if(docSnapshot.exists) {

            storageRef.set({name})

            res.status(200).send(`Armazém de id ${id} atualizado com sucesso.`)
        }
        else {
            res.status(400).send(`Armazém de id ${id} não encontrado.`)
        }
    })
    .catch(standardErrorHandler(res))
}

exports.addStorage = addStorage
exports.getStorage = getStorage
exports.getStorages = getStorages
exports.putStorage = putStorage
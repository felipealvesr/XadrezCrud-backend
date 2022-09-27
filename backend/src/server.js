const express = require('express')
const app = express()
const cors = require("cors");
const mongoose = require('mongoose')

const Jogador = require('./models/Jogador')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.use(cors());

app.post('/jogador', async (req, res) => {

    const { nome, email, nascimento, cep, cidade, estado, bairro, logradouro, data } = req.body

    const jogador = {
        nome,
        email,
        nascimento,
        cep,
        cidade,
        estado,
        bairro,
        logradouro,
        data
    }

    try {
        await Jogador.create(jogador)

        res.status(201).json({ message: 'Jogador cadastrado com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.get('/jogador', async (req, res) => {
    try {
        const jogador = await Jogador.find().sort('-data')

        res.status(200).json(jogador)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.get('/jogador/:id', async (req, res) => {
    const id = req.params.id

    try {
        const jogador = await Jogador.findOne({ _id: id })

        if (!jogador) {
            res.status(422).json({ message: 'Jogador não encontrado!' })
            return
        }

        res.status(200).json(jogador)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.patch('/jogador/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    const { nome, nascimento, email, cep, logradouro, bairro, cidade, estado, data } = req.body

    const jogador = {
        nome,
        nascimento,
        email,
        cep,
        logradouro,
        bairro,
        cidade,
        estado,
        data,
    }

    try {
        const updatedJogador = await Jogador.updateOne({ _id: id }, jogador)

        console.log(updatedJogador)

        if (updatedJogador.matchedCount === 0) {
            res.status(422).json({ message: 'Jogador não encontrado!' })
            return
        }

        res.status(200).json(jogador)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.delete('/jogador/:id', async (req, res) => {
    const id = req.params.id

    const jogador = await Jogador.findOne({ _id: id })

    if (!jogador) {
        res.status(422).json({ message: 'Jogador não encontrado!'})
        return
    }

    try {
        await Jogador.deleteOne({ _id: id })

        res.status(200).json({ message: 'Jogador removido com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' })
})

mongoose
    .connect(
        'mongodb+srv://felipe:felipe@cluster0.6u02xay.mongodb.net/test',
    )
    .then(() => {
        console.log('Conectou ao banco!')
        app.listen(3333)
    })
    .catch((err) => console.log(err))
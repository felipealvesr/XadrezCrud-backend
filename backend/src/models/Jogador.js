const mongoose = require('mongoose')

const Jogador = mongoose.model('Jogador', {
  nome: String,
  nascimento: String,
  email: String,
  cep: String,
  logradouro: String,
  bairro: String,
  cidade: String,
  estado: String,
  data: String
})

module.exports = Jogador
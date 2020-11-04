
const mongoose = require('mongoose');
const MedicoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    especializacao: {
        type: String,
        required: true
    },
    preco_consulta: {
        type: Number,
        required: true
    },
    telefone: {
        type: String,
    },
    email: {
        type: String,
    },
    whatsapp: {
        type: Number,
    },
    foto: {
        type: String,
    },
});
mongoose.model('medicos', MedicoSchema);
module.exports = mongoose.model('medicos');

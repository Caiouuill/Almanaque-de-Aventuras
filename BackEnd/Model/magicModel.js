const mongoose = require('mongoose');

const magicSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  nivel: { type: Number, required: true },
  escola: { type: String, required: true },
  tempoConjuracao: { type: String, required: true },
  alcance: { type: String, required: true },
  componentes: {
    V: { type: Boolean, default: false },
    S: { type: Boolean, default: false },
    M: { type: Boolean, default: false }
  },
  duracao: { type: String, required: true },
  descricao: { type: String, required: true },
  livro: { type: String, required: true },
  pagina: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Magic', magicSchema);

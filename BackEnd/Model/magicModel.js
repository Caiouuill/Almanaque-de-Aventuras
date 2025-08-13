const mongoose = require('mongoose');

const magicSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  classe: {
    Art: { type: Boolean, required: false },
    Bar: { type: Boolean, required: false },
    Brd: { type: Boolean, required: false },
    Cle: { type: Boolean, required: false },
    Drd: { type: Boolean, required: false },
    Gue: { type: Boolean, required: false },
    Lad: { type: Boolean, required: false },
    Mag: { type: Boolean, required: false },
    Mon: { type: Boolean, required: false },
    Pal: { type: Boolean, required: false },
    Pat: { type: Boolean, required: false },
    Fei: { type: Boolean, required: false },
    Bru: { type: Boolean, required: false }
  },
  numero: { type: Number, required: true, unique: true },
  nivel: { type: String, required: true },
  escola: { type: String, required: true },
  tempoConjuracao: {
    type: String,
    required: true,
    enum: ['Ação', 'Ação Bônus', 'Reação', 'Especial', 'Minutos', 'Horas']
  },
  alcance: {
    tipo: {
      type: String,
      required: true,
      enum: ['Pessoal', 'Toque', 'Metros', 'Km']
    },
    distancia: { type: Number } // opcional, para 'Metros' e 'Km'
  },
  ritual: { type: Boolean, default: false },
  tipoMagia: {
    type: String,
    enum: ['Dano', 'Cura', 'Outro'],
    default: 'Outro',
    required: true
  },
  duracao: { type: String, required: true },
  componentes: {
    V: { type: Boolean, default: false },
    S: { type: Boolean, default: false },
    M: { type: Boolean, default: false },
    I: { type: String } // descrição dos materiais, opcional
  },
  descricao: { type: String, required: true },
  niveisAltos: { type: String },
  livro: { type: String, required: true },
  pagina: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Magic', magicSchema);

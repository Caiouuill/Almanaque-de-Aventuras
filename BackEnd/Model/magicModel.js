const mongoose = require('mongoose');

const BOOKS = [
  'PHB',  // Player’s Handbook
  'XGE',  // Xanathar’s Guide to Everything
  'TCE',  // Tasha’s Cauldron of Everything
  'EEPC', // Elemental Evil Player’s Companion
  'SCAG', // Sword Coast Adventurer’s Guide
  'AI',   // Acquisitions Incorporated
  'EGtW', // Explorer’s Guide to Wildemount
  'GGR',  // Guildmaster’s Guide to Ravnica
  'LLK',  // Lost Laboratory of Kwalish
  'AAG',  //Astral Adventures Guide
  'SCC',  //Strixhaven: A Curriculum of Chaos
  'IDRotF',//Icewind Dale: Rime of the Frostmaiden
  'FTD',  //Fizban's Treasury of Dragons
  'SatO',  //Sigil and the Outlands
  'BMT'   //The Book of Many Things
];

const CLASSES = [
  'Artífice',
  'Bardo',
  'Bruxo',
  'Clérigo',
  'Druida',
  'Guerreiro',
  'Ladino',
  'Mago',
  'Monge',
  'Paladino',
  'Patrulheiro',
  'Feiticeiro',
  'Bárbaro'
];

const magicSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  nomeIngles: { type: String }, // opcional, para exibir no card
  classes: [{
    type: String,
    enum: CLASSES
  }],
  numero: { type: Number, required: true, unique: true },
  nivel: { type: String, required: true },
  escola: { type: String, required: true },
  tempoConjuracao: {
    tipo: {
      type: String,
      required: true,
      enum: ['Ação', 'Ação Bônus', 'Reação', 'Especial', 'Minutos', 'Horas']
    },
    quantidade: {
      type: Number,
      required: false // só vai ser necessário se for Minutos ou Horas
    }
  },
  alcance: {
    tipo: {
      type: String,
      required: true,
      enum: ['Pessoal', 'Toque', 'Metros', 'Km', 'Visão','Ilimitado']
    },
    distancia: { type: Number } // opcional
  },
  ritual: { type: Boolean, default: false },
  tipoMagia: {
    type: String,
    enum: ['Dano', 'Cura', 'Defesa', 'Buff', 'Debuff', 'Controle','Utilidade', 'Outro'],
    default: 'Outro',
    required: true
  },
  duracao: { type: String, required: true },
  componentes: {
    V: { type: Boolean, default: false },
    S: { type: Boolean, default: false },
    M: { type: Boolean, default: false },
    I: { type: String } // materiais, se houver
  },
  descricao: { type: String, required: true },
  niveisAltos: { type: String },
  livro: {
    type: String,
    enum: BOOKS,
    required: true
  },
  pagina: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Magic', magicSchema);
module.exports.BOOKS = BOOKS;
module.exports.CLASSES = CLASSES;

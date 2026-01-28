const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },

    // 📚 Origem do material (livro)
    origem: {
      type: String,
      enum: [
        "PHB'14",
        "PHB'24",
        "DMG'24",
        "TCE",
        "XGE",
        "WDH",
        "ERLW",
        "SCC",
        "QftIS",
        "FRHoF",
        "AAG",
        "EGW",
        "SCAG",
        "JttRC",
        "HotB",
        "IDRotF",
        "FRAiF",
        "VGM",
        "DSotDQ",
        "VRGR",
        "ToA",
        "CoS",
        "OotA",
      ],
      trim: true
    },

    pagina: { type: String, trim: true },

    // ⭐ Raridade padronizada
    raridade: {
      type: String,
      enum: [
        "nenhuma",
        "comum",
        "incomum",
        "rara",
        "muito rara",
        "lendária",
        "artefato",
        "desconhecida"
      ],
      default: "nenhuma",
      trim: true
    },

    // 🏷️ Tipo principal do item (normalizado)
    tipo: {
      type: String,
      enum: [
        "Arma",
        "Armadura",
        "Ferramenta",
        "Munição",
        "Explosivo",
        "Explosivo Moderno",
        "Equipamento de Aventura",
        "Ferramentas de Artesão",
        "Comida e Bebida",
        "Instrumento",
        "Foco de Conjuração",
        "Veículo",
        "Veículo (Espacial)",
        "Montaria",
        "Mercadoria",
        "Item Maravilhoso",
        "Variante Genérica",
        "Poção",
        "Poção (Ingerida)",
        "Poção (Inalada)",
        "Poção (Contato)",
        "Poção (Ferimento)",
        "Outro",
        "Arma de Fogo",
        "Futurista"
      ],
      trim: true
    },

    // 🔮 Sintonia (attunement)
    sintonia: {
      type: String,
      enum: [
        "nenhuma",
        "requer sintonia por qualquer criatura",
        "requer sintonia por um mago",
        "requer sintonia por um clérigo",
        "requer sintonia por um paladino",
        "requer sintonia por um clérigo ou paladino",
        "requer sintonia por um bruxo",
        "requer sintonia por um feiticeiro",
        "requer sintonia por um artífice",
        "requer sintonia por uma classe específica"
      ],
      default: "nenhuma",
      trim: true
    },

    // ⚔️ Combate
    dano: { type: String, trim: true },
    propriedades: { type: String, trim: true },
    maestria: { type: String, trim: true },

    // ⚖️ Economia
    peso: { type: String, trim: true },
    valor: { type: String, trim: true },

    // 📜 Descrição completa
    texto: { type: String },

    // ✨ Diferencia item mágico e não mágico
    itemMagico: { type: Boolean, default: false },

    // 🧠 EXTRA (opcional, mas MUITO útil para filtros futuros)
    categoria: {
      type: String,
      enum: [
        "arma",
        "armadura",
        "equipamento",
        "instrumento",
        "ferramenta",
        "explosivo",
        "consumível",
        "veículo",
        "munição",
        "montaria",
        "outro"
      ],
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema);

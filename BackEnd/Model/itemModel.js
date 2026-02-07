const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },

    // 📚 Origem do material (livro)
    origem: {
      type: String,
      enum: [
        "PHB'24", // Player's Handbook 2024
        "DMG'24", // Dungeon Master's Guide 2024
        "MM'24", // Monster Manual 2024
        "TCE", // Tasha's Cauldron of Everything
        "XGE", // Xanathar's Guide to Everything
        "AI", // Acquisitions Incorporated
        "BGDIA", // Baldur's Gate: Descent into Avernus
        "ERLW", // Eberron: Rising from the Last War
        "SCAG", // Sword Coast Adventurer's Guide
        "MTF", // Mordenkainen's Tome of Foes
        "VGM", // Volo's Guide to Monsters
        "XGE", // Xanathar's Guide to Everything
        "NF", // Netheril`s Fall
        "ROT", // Rise of Tiamat
        "EFA", // Eberon: Forge of the Artificer
      ],
      trim: true
    },

    pagina: { type: String, trim: true },

    // ⭐ Raridade padronizada
    raridade: {
      type: String,
      enum: [
        "Nenhuma",
        "Comum",
        "Incomum",
        "Rara",
        "Muito Rara",
        "Lendária",
        "Artefato",
        "Desconhecida",
        "Especial"
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

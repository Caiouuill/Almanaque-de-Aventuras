const Item = require('../Model/itemModel');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();

        const ordered = items.map(item => ({
            _id: item._id,
            nome: item.nome,
            origem: item.origem || '',
            pagina: item.pagina || '',
            raridade: item.raridade || '',
            tipo: item.tipo || '',
            sintonia: item.sintonia || '',
            dano: item.dano || '',
            propriedades: item.propriedades || '',
            maestria: item.maestria || '',
            peso: item.peso || '',
            valor: item.valor || '',
            texto: item.texto || '',
            itemMagico: item.itemMagico || false,
            categoria: item.categoria || '',
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            __v: item.__v
        }));


        res.json(ordered);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item não encontrado' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: 'ID inválido' });
    }
};

exports.createItem = async (req, res) => {
    try {
        let result;

        if (Array.isArray(req.body)) {
            result = await Item.insertMany(req.body);
        } else {
            const newItem = new Item(req.body);
            result = await newItem.save();
        }

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const deleted = await Item.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Item não encontrado' });
        res.json({ message: 'Item deletado com sucesso' });
    } catch (err) {
        res.status(400).json({ error: 'ID inválido' });
    }
};

exports.deleteAllItem = async (req, res) => {
    try {
        const deleted = await Item.deleteMany({});
        res.json({ message: 'Todos os itens deletados com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
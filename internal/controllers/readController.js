const Read = require("../models/read");
const db = require("../database/db");
const readModel = new Read(db);

exports.read = (req, res) => {
    const path = req.params[0];
    readModel.read(path, res, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

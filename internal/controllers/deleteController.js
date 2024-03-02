const Delete = require("../models/deleteModel");
const db = require("../database/db");

const deleteModel = new Delete(db);

exports.delete = (req, res) => {
    const path = req.params[0];
    const query = req.query;
    deleteModel.delete(path, res, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

const Delete = require("../models/delete");
const db = require("../database/db");

const deleteModel = new Delete(db);

exports.delete = (req, res) => {
    const path = req.params[0];
    deleteModel.delete(path, res, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

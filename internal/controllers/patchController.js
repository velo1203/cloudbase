const db = require("../database/db");
const Patch = require("../models/patch");
const patchModel = new Patch(db);

exports.patch = (req, res) => {
    const path = req.params[0];
    const data = JSON.stringify(req.body);
    patchModel.patch(path, data, res, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Data saved successfully",
            id: result.lastID,
        });
    });
};

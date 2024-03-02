const db = require("../database/db");
const Patch = require("../models/patch");
const patchModel = new Patch(db);

exports.patch = (req, res) => {
    const path = req.params[0];
    const data = JSON.stringify(req.body);

    if (JSON.parse(data)["id"]) {
        // ID가 포함되어 있는지 확인
        return res.status(400).json({ error: "ID cannot be updated" });
    }
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

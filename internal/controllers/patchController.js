const db = require("../database/db");
const Patch = require("../models/patchModel");
const patchModel = new Patch(db);

exports.patch = (req, res) => {
    const path = req.params[0];
    const data = JSON.stringify(req.body);

    patchModel
        .patch(path, data)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

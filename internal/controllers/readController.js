const Read = require("../models/readModel.js");
const db = require("../database/db");
const readModel = new Read(db);

exports.read = (req, res) => {
    const path = req.params[0];
    const query = req.query;

    // req.query가 빈 객체인지 확인
    if (Object.keys(req.query).length === 0) {
        readModel.read(path, res, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(result);
        });
    } else {
        readModel.search(query, path, res, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(result);
        });
    }
};

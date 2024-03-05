const Read = require("../models/readModel.js");
const db = require("../database/db");
const readModel = new Read(db);

exports.read = (req, res) => {
    const path = req.params[0];
    const query = req.query;

    // req.query가 빈 객체이고, 경로의 마지막 문자가 '/'인 경우 getAll 메서드를 호출합니다.
    if (Object.keys(req.query).length === 0 && path.endsWith("/")) {
        readModel
            .getAll(path)
            .then((result) => {
                if (result) {
                    res.status(200).json(result);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });

        // req.query가 빈 객체가 아닌 경우 search 메서드를 호출합니다.
    } else if (Object.keys(req.query).length > 0) {
        readModel
            .search(query, path)
            .then((result) => {
                if (result) {
                    res.status(200).json(result);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
        // 그 외의 경우, 즉 req.query가 빈 객체이고 경로의 마지막 문자가 '/'가 아닌 경우 read 메서드를 호출합니다.
    } else {
        readModel
            .read(path)
            .then((result) => {
                if (result) {
                    res.status(200).json(result);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    }
};

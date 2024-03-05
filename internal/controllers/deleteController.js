const Delete = require("../models/deleteModel");
const db = require("../database/db");
const Read = require("../models/readModel");
const deleteModel = new Delete(db);
const ReadModel = new Read(db);

exports.delete = (req, res) => {
    const path = req.params[0];
    const key = req.body.key;
    if (key) {
        //특정한 키를 삭제해야함, 과정은 해당 path에 전체 데이터를 가져오고 특정 키를 삭제하고 다시업데이트를 진행함
        deleteModel
            .specificDelete(path, key, res)
            .then((result) => {
                if (result) {
                    res.status(200).json(result);
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err.message });
            });
    } else {
        deleteModel
            .delete(path, res)
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

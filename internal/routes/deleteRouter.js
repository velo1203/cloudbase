const express = require("express");
const router = express.Router();
const deleteController = require("../controllers/deleteController");

router.delete("*", (req, res) => {
    deleteController.delete(req, res);
});

module.exports = router; // 정의된 라우터 모듈을 내보냅니다.

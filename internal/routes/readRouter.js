const express = require("express");
const router = express.Router();
const readController = require("../controllers/readController");
router.get("*", (req, res) => {
    readController.read(req, res);
});

module.exports = router; // 정의된 라우터 모듈을 내보냅니다.

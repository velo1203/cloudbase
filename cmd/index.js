const express = require("express");

const postRouter = require("../internal/routes/postRouter");
const readRouter = require("../internal/routes/readRouter");
const deleteRouter = require("../internal/routes/deleteRouter");
const setPort = require("../internal/bootstrap/port");
const logger = require("../internal/config/Logger");
const log = new logger();

const app = express();
const port = setPort();

app.use(express.json()); // JSON 요청 본문 파싱을 위한 미들웨어
// 라우터 등록
app.use(postRouter);
app.use(readRouter);
app.use(deleteRouter);

log.success("Server initialized");

app.listen(port, () => {
    log.info(`Server is running on port ${port}`);
    log.info("Hello User");
});

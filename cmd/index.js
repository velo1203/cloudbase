const express = require("express");

const postRouter = require("../internal/routes/postRouter");
const readRouter = require("../internal/routes/readRouter");
const deleteRouter = require("../internal/routes/deleteRouter");
const logger = require("../internal/middleware/log_request");

const config = require("../config.json"); // 설정 파일을 불러옵니다.
const app = express();
const port = config.port || 3000;

app.use(express.json()); // JSON 요청 본문 파싱을 위한 미들웨어
app.use(logger);
// 라우터 등록
app.use(postRouter);
app.use(readRouter);
app.use(deleteRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

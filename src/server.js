// モジュール
const app = require("./app");
const debug = require("debug")("test:server");
const http = require("http");

//ポートを設定
const port = normalizePort(process.env.PORT || "3500");
app.set("port", port);

//サーバーの作成
const server = http.createServer(app);

//ポートを監視
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

//有効なポート値か判断
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//エラーハンドリング
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // エラー情報によって適切なエラーメッセージを生成
  switch (error.code) {
    //アクセス権限のエラー
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      //終了ステータスを0以外に設定
      process.exit(1);
      break;
    //指定されたポートが使われているエラー
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//onListening時のログ
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

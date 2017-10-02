import mongoose from "mongoose";
import app from "./app";
import serverConfig from "./config";

mongoose.connect(serverConfig.mongoURL);
const db = mongoose.connection;

db.on("connected", () => {
    console.log("db connection is open to " + serverConfig.mongoURL);
});
db.on("error", err => {
    console.log("connection error: " + err);
});
db.on("disconnected", () => {
    console.log("disconnected");
});

app.listen(serverConfig.port, () => {
    console.log(`Running on port ${serverConfig.port}!`);
});
require("dotenv").config();
const Securd = require("./structures/Securd");

new Securd();
process.on("unhandledRejection", (e) => console.log(e));
process.on("uncaughtException", (e) => console.log(e));
process.on("uncaughtExceptionMonitor", (e) => console.log(e));
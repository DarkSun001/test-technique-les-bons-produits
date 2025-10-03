"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/health", function (req, res) {
    res.json({ ok: true });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("\u2705 Serveur lanc\u00E9 sur http://localhost:".concat(PORT));
});

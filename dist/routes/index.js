"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.post("/prompt", controller_1.controller);
router.get("/health", (res) => {
    res.status(200).json({ status: "OK", message: "Service is healthy" });
});
exports.default = router;

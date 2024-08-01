"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const claudeService_1 = __importDefault(require("../services/claudeService"));
const zeroGPTService_1 = __importDefault(require("../services/zeroGPTService"));
const huggingFaceService_1 = __importDefault(require("../services/huggingFaceService"));
const replicateService_1 = __importDefault(require("../services/replicateService"));
const stabilityService_1 = __importDefault(require("../services/stabilityService"));
function controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { prompt, selectedAPI, output_format } = req.body;
        try {
            switch (selectedAPI) {
                case "replicate":
                    yield (0, replicateService_1.default)(prompt, res);
                    break;
                case "stableDiffusion":
                    yield (0, stabilityService_1.default)({ prompt, output_format }, res);
                    break;
                case "huggingFace":
                    yield (0, huggingFaceService_1.default)(res);
                    break;
                case "claude":
                    const response = yield (0, claudeService_1.default)(prompt);
                    break;
                case "zeroGPT":
                    yield (0, zeroGPTService_1.default)(prompt, res);
                    break;
                default:
                    throw new Error("Invalid API Selection");
                    break;
                    res.json({ response });
            }
        }
        catch (e) {
            (0, errorHandler_1.default)(res, e);
        }
    });
}
exports.controller = controller;

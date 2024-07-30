"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(res, error) {
    console.error(error);
    res.status(500).json({
        error: error || "An unexpected error occured",
    });
}
exports.default = errorHandler;

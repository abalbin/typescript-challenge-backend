"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./helpers/env");
const express_1 = __importDefault(require("express"));
const stays_1 = __importDefault(require("./stays"));
const reviews_1 = __importDefault(require("./reviews"));
const port = 3000;
const app = express_1.default();
app.use(express_1.default.json());
app.use("/stays", stays_1.default);
app.use("/reviews", reviews_1.default);
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
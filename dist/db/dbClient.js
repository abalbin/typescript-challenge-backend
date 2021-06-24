"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class DbClient {
    constructor() { }
    static isConnected() {
        if (!this._dbClient) {
            return false;
        }
        return this._dbClient.isConnected();
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isConnected()) {
                console.info("reusing connection");
                return this._dbClient;
            }
            console.info("connecting...");
            const client = new mongodb_1.MongoClient(this._dbString, { useUnifiedTopology: true });
            yield client.connect();
            this._dbClient = client;
            console.info("connected!");
            return this._dbClient;
        });
    }
}
DbClient._dbString = process.env.MONGO_URL;
exports.DbClient = DbClient;
//# sourceMappingURL=dbClient.js.map
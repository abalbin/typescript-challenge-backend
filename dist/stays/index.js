"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const _helpers_1 = require("./_helpers");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    if (!body) {
        console.warn("Invalid Body");
        res.statusCode = 400;
        res.json({
            message: "Invalid Body",
        });
        return;
    }
    const client = yield db_1.DbClient.get();
    const col = client.db("sample_airbnb").collection("listingsAndReviews");
    // Get the requested limit
    const limit = Math.max(1, Math.min(25, body.limit || 0));
    const query = col.find(_helpers_1.getListingsFilter(req.body), { limit }).sort({ _id: 1 });
    const resultArray = yield query.toArray();
    const listingArray = [];
    let pushCount = 0;
    let lastEvaluatedId;
    for (const result of resultArray) {
        listingArray.push({
            _id: result._id,
            amenities: result.amenities,
            bathrooms: +result.bathrooms,
            bedrooms: result.bedrooms,
            beds: result.beds,
        });
        pushCount += 1;
        lastEvaluatedId = result._id;
    }
    const responseBody = {
        items: listingArray,
    };
    if (pushCount >= limit) {
        responseBody.lastId = lastEvaluatedId;
    }
    res.json(responseBody);
}));
exports.default = router;
//# sourceMappingURL=index.js.map
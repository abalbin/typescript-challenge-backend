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
const router = express_1.default.Router();
router.get("/:listingId", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const listingId = req.params.listingId;
    if (!listingId) {
        console.warn("Invalid listing id");
        res.statusCode = 400;
        res.json({
            message: "Invalid Listing ID",
        });
        return;
    }
    // Get the collection
    const client = yield db_1.DbClient.get();
    const col = client.db("sample_airbnb").collection("listingsAndReviews");
    // Make the query
    const result = yield col.findOne({ _id: listingId });
    // Parse the response
    if (!result || !result.reviews) {
        res.json({ reviews: [] });
        return;
    }
    const reviews = [];
    for (const rv of result.reviews) {
        reviews.push({
            _id: rv._id,
            comments: rv.comments,
            date: rv.date,
            reviewer_id: rv.reviewer_id,
            reviewer_name: rv.reviewer_name,
        });
    }
    res.json({ reviews });
}));
exports.default = router;
//# sourceMappingURL=index.js.map
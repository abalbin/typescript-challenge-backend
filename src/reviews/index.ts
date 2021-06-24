import express from "express";
import { DbClient } from "../db";
import { ErrorResponseBody } from "../helpers/_types";
import { GetReviewsResponse, Review } from "./_types";

const router = express.Router();

router.get<{ listingId: string }, GetReviewsResponse | ErrorResponseBody>("/:listingId", async (req, res) => {
	// Validate the request
	const listingId = req.params.listingId;
	if (!listingId) {
		console.warn("Invalid listing id");
		res.statusCode = 400;
		res.json({
			message: "Invalid Listing ID",
		});
		return;
	}

	// Get the DB collection
	const client = await DbClient.get();
	const col = client.db("sample_airbnb").collection("listingsAndReviews");

	// Make the query
	const result = await col.findOne({ _id: listingId });

	// Parse the response
	if (!result || !result.reviews) {
		res.json({ reviews: [], listingId });
		return;
	}

	// Build the response
	const reviews: Review[] = [];
	for (const rv of result.reviews) {
		reviews.push({
			_id: rv._id,
			comments: rv.comments,
			date: rv.date,
			reviewer_id: rv.reviewer_id,
			reviewer_name: rv.reviewer_name,
		});
	}
	res.json({ reviews, listingId });
});

export default router;

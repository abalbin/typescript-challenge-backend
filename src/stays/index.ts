import express from "express";
import { ErrorResponseBody } from "../helpers/_types";
import { DbClient } from "../db";
import { getListingsFilter } from "./_helpers";
import { GetListingsRequestBody, GetListingsResponseBody, Stay } from "./_types";

const router = express.Router();

router.post<unknown, GetListingsResponseBody | ErrorResponseBody, GetListingsRequestBody>("/", async (req, res) => {
	// Validate the request
	const body = req.body;
	if (!body) {
		console.warn("Invalid Body");
		res.statusCode = 400;
		res.json({
			message: "Invalid Body",
		});
		return;
	}

	// Get the DB collection
	const client = await DbClient.get();
	const col = client.db("sample_airbnb").collection("listingsAndReviews");

	// Get the requested limit: the maximum number of items requested will always be 25 and the min will always be 0
	const limit = Math.max(1, Math.min(25, body.limit || 0));
	const query = col.find(getListingsFilter(req.body), { limit }).sort({ _id: 1 });

	// Execute the query
	const resultArray = await query.toArray();
	const listingArray: Stay[] = [];

	// Parse the response
	let pushCount = 0;
	let lastEvaluatedId: string;
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

	const responseBody: GetListingsResponseBody = {
		items: listingArray,
	};

	// Send an id to retrieve the next batch of elements
	if (pushCount >= limit) {
		responseBody.lastId = lastEvaluatedId;
	}

	res.json(responseBody);
});

export default router;

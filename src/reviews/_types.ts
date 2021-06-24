export interface Review {
	_id: string;
	comments: string;
	reviewer_id: string;
	reviewer_name: string;
	date: string;
}

/**
 * The response body of the endpoint for getting the reviews of a
 * single listing
 */
export interface GetReviewsResponse {
	reviews: Review[];
	listingId: string;
}

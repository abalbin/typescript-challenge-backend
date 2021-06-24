import { FilterQuery } from "mongodb";
import { GetListingsRequestBody, Stay } from "./_types";

/**
 * Build a filter query from the params requested
 * @param request A GetListingsRequestBody object
 * @returns A FilterQuery for using in a find() operation
 */
export function getListingsFilter(request: GetListingsRequestBody): FilterQuery<Stay> {
	const filter: FilterQuery<Stay> = {};
	if (request.bathrooms) {
		filter.bathrooms = request.bathrooms;
	}
	if (request.bedrooms) {
		filter.bedrooms = request.bedrooms;
	}
	if (request.beds) {
		filter.beds = request.beds;
	}
	if (request.amenities) {
		filter.amenities = { $all: request.amenities };
	}

	// This will be used for pagination
	if (request.after) {
		filter._id = { $gt: request.after };
	}

	return filter;
}

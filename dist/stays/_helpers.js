"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getListingsFilter(request) {
    const filter = {};
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
    if (request.after) {
        filter._id = { $gt: request.after };
    }
    return filter;
}
exports.getListingsFilter = getListingsFilter;
//# sourceMappingURL=_helpers.js.map
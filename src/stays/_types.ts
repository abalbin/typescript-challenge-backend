export interface Stay {
	_id: string;
	bedrooms: number;
	beds: number;
	bathrooms: number;
	amenities: string[];
}

export interface GetListingsRequestBody {
	bedrooms?: number;
	beds?: number;
	bathrooms?: number;
	amenities?: string[];
	limit?: number;
	after?: string;
}

export interface GetListingsResponseBody {
	items: Stay[];
	lastId?: string;
}

# TS challenge

## Usage

1. Install the dependencies: `npm ci`
2. Initialize the server: `npm run start`

## Connection Strategy

For reusing an open connection to the DB server, I am using a class that implements a singleton like pattern to handle the mongo client. This will also work if we want to use another db schema or collection.

## Pagination strategy

I am using a simple pagination strategy that consists of first ordering the data by it's `_id` attribute and then taking the number of requested elements.

If the number of elements retrieved from the DB is the same as the requested, we will be including the last element's `_id` in the response in an attribute called `lastId`. Then, the client can send this id for the subsequent request in the `after` request param.

Once we have an `after` request param, the query will take the elements with `_id` greater than that.

This process can be repeated until the response don't return a `lastId` value. In this case, we know there are no more elements to retrieve.

This strategy it's good for interfaces that have a `Load more` button or automatically loads more data on scroll.

## For improving

- Handle errors strategy (try catch)
- Retry a connection if it fails. Can have a max number of attempts and then fail.
- Implement unit tests
- Centralize the error responses in a single function for an easier reuse.

## TODO

- ✅ Reusable db connection
- ✅ Get listings
  - ✅ Filter
  - ✅ Pagination
- ✅ Get reviews of a single listing
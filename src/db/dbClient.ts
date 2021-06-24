import { MongoClient } from "mongodb";

/**
 * Singleton class that will always return the same Mongo Client
 * Once it was previously successfully connected to the DB server
 */
export class DbClient {
	protected static _dbClient: MongoClient;
	private static _dbString: string = process.env.MONGO_URL;
	constructor() {}

	/**
	 * Check if the mongo client doesn't exist or if it needs to initialize a new connection
	 * @returns A boolean
	 */
	public static isConnected(): boolean {
		if (!this._dbClient) {
			return false;
		}
		return this._dbClient.isConnected();
	}

	/**
	 * Get the mongo client
	 * @returns A connected mongo client
	 */
	public static async get(): Promise<MongoClient> {
		// Reuse an existing connection
		if (this.isConnected()) {
			return this._dbClient;
		}
		
		// Create a new connection to the db server and set it to this class static property
		const client = new MongoClient(this._dbString, { useUnifiedTopology: true });
		await client.connect();
		this._dbClient = client;
		return this._dbClient;
	}
}

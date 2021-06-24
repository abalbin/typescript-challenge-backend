import { resolve } from "path"
import { config } from "dotenv"

// Config the env file
config({ path: resolve(__dirname, "../../.env") })
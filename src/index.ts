import "./helpers/env"; // config the .env file
import express from "express";
import Stays from "./stays";
import Reviews from "./reviews";

const port = 3000;
const app = express();

app.use(express.json());

app.use("/stays", Stays);
app.use("/reviews", Reviews);

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});

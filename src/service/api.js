import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:3334",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
});
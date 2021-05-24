import axios from "axios";

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-Type": "application/json",
	}
});

axiosClient.interceptors.response.use(
	(response) => {
		if (!response) {
			throw new Error("NO_RESPONSE");
		}

		return response;
	},
	(error) => {
		console.error("CUSTOM ERROR", error);
        //HANDLE ERROR HERE (SWITCH CASE WITH ERROR CODE/ERROR MESSAGE)
	}
);

export default axiosClient;

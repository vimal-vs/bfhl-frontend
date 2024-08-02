import axios from "axios";

export const postData = async (data) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bfhl`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
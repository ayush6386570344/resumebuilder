import api from "../config/api";

export const analyzeResume = async (formData, token) => {
    const { data } = await api.post(
        "/api/ai/analyze",
        formData,
        {
            headers: {
                Authorization: token,
            },
        }
    );

    return data;
};
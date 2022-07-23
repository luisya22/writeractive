import api from "./axiosConfig";


export const getUserStories = async (accessToken: string) => {

    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    return await api.get("/stories/user", options)
}
import api from "./axiosConfig";

export type StorySaveRequest = {
    id: string | null | undefined,
    title: string,
    description: string,
    coverPage: string,
    genre: string,
    language: string
}

export const saveStory = async (story: StorySaveRequest,accessToken: string) =>{
    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    return await api.post("/stories", story, options);
}


export const getUserStories = async (accessToken: string) => {

    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    return await api.get("/stories/user", options)
}
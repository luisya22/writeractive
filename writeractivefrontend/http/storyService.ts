import api from "./axiosConfig";

export type StorySaveRequest = {
    id: string | null | undefined,
    title: string,
    description: string,
    coverPage: string,
    genre: string,
    language: string
}

//TODO: Move token to interceptor

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

export const getStoryById = async (id: string, accessToken: string) => {

    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    return await api.get(`/stories/${id}/edit`);
}
import api from "./axiosConfig";

export const findOrSaveReadingSession = async (storyId: string, accessToken: string) => {
    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    return await api.post(`/readings/stories/add/${storyId}`, null, options);
}

export const getReadingSessionById = async (readingSessionId: string, accessToken: string) => {
    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    return await api.get(`/readings/${readingSessionId}`, options);
}

export const updateReadingSession = async (readingSessionId: string, choiceId: string, accessToken: string) => {
    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    const data: any = {
        id: readingSessionId,
        choiceId: choiceId
    }

    return await api.patch(`/readings/${readingSessionId}`, data, options);
}
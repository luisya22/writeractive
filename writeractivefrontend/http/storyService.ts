import api from "./axiosConfig";

export type StorySaveRequest = {
    id: string | null | undefined,
    title: string,
    description: string,
    coverPage: string,
    genre: string,
    language: string
}

export type ChapterUpdateRequest = {
    id: string | null | undefined,
    title: string,
    content: string
    positionX: number | null,
    positionY: number | null
}

export type ChapterCreateRequest = {
    id: string | null | undefined,
    title: string,
    content: string
    positionX: number | null,
    positionY: number | null
}

export type ChoiceRequest = {
    id: string | null | undefined,
    text: string,
    nextChapterId: string | null | undefined
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

    return await api.get(`/stories/${id}/edit`, options);
}

export const getChaptersByStory = async (storyId: string, accessToken: string) => {
    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    return await api.get(`/stories/${storyId}/chapters`, options);
}

export const saveChapter = async (storyId: string, chapter: ChapterCreateRequest, accessToken: string) => {
    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    return await api.post(`/stories/${storyId}/chapters`, chapter, options);
}

export const updateChapter = async (storyId: string, chapter: ChapterUpdateRequest, accessToken: string) => {
    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    return await api.patch(`/stories/${storyId}/chapters/${chapter.id}`, chapter, options);
}

export const saveChoice = async (chapterId: string | null, choice: ChoiceRequest, accessToken: string) =>{
    const options = {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }

    if(chapterId == null){
        return; //TODO: Alert
    }


    return await api.post(`/chapters/${chapterId}/choices`, choice, options);
}
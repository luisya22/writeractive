import Image from "next/image";
import {FormValidationProvider} from "../../context/FormValidationContext";
import InputField from "../InputField/InputField";
import TextArea from "../TextArea/TextArea";
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {saveStory, StorySaveRequest} from "../../http/storyService";
import {useAuthentication} from "../../context/AuthContext";
import {useRouter} from "next/router";

type StoryFormProps = {
    storyId: string | null,
    storyTitle: string,
    storyDescription: string,
    storyCoverPage: string,
    storyGenre: string,
    storyLanguage: string,
}


const StoryForm: FC<StoryFormProps> = (
    {
        storyId,
        storyTitle,
        storyDescription,
        storyCoverPage,
        storyGenre,
        storyLanguage,
    }) =>{

    const [title, setTitle] = useState<string>(storyTitle);
    const [description, setDescription] = useState<string>(storyDescription);
    const [coverPage, setCoverPage] = useState<string>(storyCoverPage);
    const [genre, setGenre] = useState<string>(storyGenre);
    const [language, setLanguage] = useState<string>(storyLanguage);

    const {accessToken} = useAuthentication();
    const router = useRouter();

    useEffect(() => {
        setTitle(storyTitle);
        setDescription(storyDescription);
        setCoverPage(storyCoverPage);
        setGenre(storyGenre);
        setLanguage(storyLanguage);
    }, [storyTitle, storyDescription, storyCoverPage, storyGenre, storyLanguage, storyId])

    const handleStoryCreate = async () => {
        const data: StorySaveRequest = {
            id: storyId,
            title,
            description,
            coverPage,
            genre,
            language
        }

        const storyResponse = await saveStory(data, accessToken??"");

        if(storyResponse.status == 200){
            await router.push("/engine/stories/" + storyResponse.data.id + "/edit-chapters");

            return;
        }

        //TODO: Alert

    }

    const requiredValidator = (val: string | number) => {
        if(!val){
            return ["This field is required"]
        }

        return [];
    }

    return (
        <>
            <div className="container w-full xl:w-2/3 mx-auto my-20">
                <div className={'flex flex-wrap justify-center mt-10'}>
                    <div className="w-full md:w-1/3 px-10 mb-4 xl:mb-0">
                        <Image src={ coverPage ? `https://res.cloudinary.com/demo/image/fetch/${coverPage}` : '/img.png'}
                               width={'8'}
                               height={'13'}
                               alt={'Image Picture'}
                               layout={'responsive'}
                        />
                    </div>
                    <div className="w-full md:w-2/3">
                        <div className={'bg-white px-4 py-10 rounded-xl'}>
                            <h1 className={'text-2xl font-bold mb-10'}>Story Details</h1>
                            <FormValidationProvider id={"story-form"} onSubmit={handleStoryCreate}>
                                <div className={'form'}>
                                    <div className={'form-group'}>
                                        <label>Title</label>
                                        <InputField
                                            data={title}
                                            setData={setTitle}
                                            placeholder={'Title'}
                                            name={'title'}
                                            validators={[requiredValidator]}
                                        />
                                    </div>
                                    <div className={'form-group'}>
                                        <label>Description</label>
                                        <TextArea
                                            placeholder="Description"
                                            data={description}
                                            setData={setDescription}
                                            validators={[]}
                                            name={'description'}
                                            rows={6}
                                        />
                                    </div>
                                    <div className={'form-group'}>
                                        <label>Story Cover Image Url</label>
                                        <InputField
                                            data={coverPage}
                                            setData={setCoverPage}
                                            placeholder={'Cover Page'}
                                            name={'coverPage'}
                                            validators={[]}
                                        />
                                    </div>
                                    <div className={'form-group'}>
                                        <label>Genre</label>
                                        <InputField
                                            data={genre}
                                            setData={setGenre}
                                            placeholder={'Genre'}
                                            name={'genre'}
                                            validators={[]}
                                        />
                                    </div>
                                    <div className={'form-group'}>
                                        <label>Language</label>
                                        <InputField
                                            data={language}
                                            setData={setLanguage}
                                            placeholder={'Language'}
                                            name={'language'}
                                            validators={[]}
                                        />
                                    </div>
                                    <div className={'flex justify-start w-full space-x-2'}>
                                        <button type={'submit'} className={'btn btn-light'}>Cancel</button>
                                        <button type={'submit'} className={'btn btn-primary'}>Save</button>
                                    </div>
                                </div>
                            </FormValidationProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoryForm;
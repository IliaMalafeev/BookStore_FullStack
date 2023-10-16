import { DiscussionModel } from "../../../../models/DiscussionModel";
import avatar from "../../../../assets/icons/avatar.svg";
import { useState } from "react";
import { useSubmitDiscussionResponse } from "../../../../utils/useSubmitDiscussionResponse";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { FieldErrors } from "../../../commons/field_errors/FieldErrors";
import { FormLoader } from "../../../commons/form_loader/FormLoader";

type DiscussionsTabDiscussionCardProps = {
    discussion: DiscussionModel,
    setIsDiscussionClosed: React.Dispatch<React.SetStateAction<boolean>>
}

export const DiscussionsTabDiscussionCard = ({ discussion, setIsDiscussionClosed }: DiscussionsTabDiscussionCardProps) => {

    const { authentication } = useAuthenticationContext();

    const [discussionModel, setDiscussionModel] = useState<DiscussionModel>({ ...discussion });
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

        setDiscussionModel({ ...discussionModel, response: event.target.value });
    }

    const handleSubmitDiscussion = () => {

        useSubmitDiscussionResponse(authentication, discussionModel, setIsLoading, setHttpError, setIsDiscussionClosed);
    }

    return (

        <div className="flex flex-col gap-5 p-5 rounded-md shadow-custom-2" key={discussion.id}>

            <div className="w-full flex gap-5 max-lg:flex-col justify-between">
            
                <p className="font-semibold lg:text-2xl max-lg:text-xl">
                    
                    <span className="text-teal-600">Case #{discussion.id}: </span>
                    
                    {discussion.title}
                
                </p>
                
                <p className="font-light lg:text-xl max-lg:text-lg">{discussion.personEmail}</p>

            </div>

            <div className="h-[1px] w-full bg-teal-800" />

            <div className="flex flex-col gap-5 w-full rounded-md shadow-custom-3 p-3">
                
                <div className="flex gap-4 items-center text-lg">
                                
                    <img src={avatar} alt="avatar" width={50} height={50} />
                        
                    <p className="font-bold">{discussion.personFirstName} {discussion.personLastName}</p>

                </div>

                <div className="w-full bg-teal-50 border border-teal-800 rounded-md p-3 text-lg">

                    <p>{`"${discussion.question}"`}</p>

                </div>

            </div>

            <div className="flex flex-col gap-5">

                {httpError && <FieldErrors fieldName="response" httpError={httpError} />}

                <FormLoader isLoading={isLoading} />

                <textarea rows={3} name="response" value={discussionModel.response ? discussionModel.response : ""} 
                onChange={handleChange} placeholder="Your response here..." className="input shadow-md"/>

            </div>

            <div className="flex max-lg:flex-col gap-5 items-center justify-between">

                <p className="text-amber-600 text-lg font-semibold">Discussion is open</p>

                <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800" onClick={handleSubmitDiscussion}>Submit answer</button>

            </div>
            
        </div>

    )

}
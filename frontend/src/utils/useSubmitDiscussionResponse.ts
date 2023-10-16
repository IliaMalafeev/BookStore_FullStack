import { DiscussionModel } from "../models/DiscussionModel";

export const useSubmitDiscussionResponse = async (authentication: { isAuthenticated: boolean; token: string; },
                                                  discussionModel: DiscussionModel,
                                                  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                                  setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                                  setIsDiscussionClosed: React.Dispatch<React.SetStateAction<boolean>>) => {

    const submitDiscussionResponse = async () => {

        console.log("------------------------");

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const url = "http://localhost:8080/api/discussions/secure/add-discussion";
            
            const requestOptions = {

                method: "POST",
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(discussionModel)
            };

            const response = await fetch(url, requestOptions);

            const responseJson = await response.json();
                        
            console.log(responseJson);

            if (!response.ok) {
                throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
            }

        }

        setHttpError(null);
        setIsLoading(false);
        setIsDiscussionClosed(prev => !prev);

        console.log("submit discussion fetch");
        console.log("------------------------");
    }

    submitDiscussionResponse().catch(
        
        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )
};
import { RegistrationModel } from "../models/RegistrationModel";

export const useRegister = async (registrationModel: RegistrationModel, 
                                  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
                                  setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                  setAuthentication: React.Dispatch<React.SetStateAction<{ isAuthenticated: boolean; token: string; }>>) => {

    const submitRegister = async () => {

        setIsLoading(true);

        const url = "http://localhost:8080/api/auth/register";

        const requestOptions = {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(registrationModel)
        };

        const response = await fetch(url, requestOptions);

        const responseJson = await response.json();

        if (!response.ok) {
            throw new Error(responseJson.message);
        }

        const token = responseJson.token;
        
        setAuthentication({ isAuthenticated: true, token: token });

        localStorage.setItem("authenticationState", JSON.stringify({ isAuthenticated: true, token: token }));

        setIsLoading(false);

    }

    submitRegister().catch(

        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )

};
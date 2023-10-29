import { CardElement } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import jwtDecode from "jwt-decode";
import { PaymentInfoModel } from "../models/PaymentInfoModel";

export const usePayFees = async (authentication: { isAuthenticated: boolean; token: string;  authority: string; }, 
                                elements: StripeElements | null, 
                                stripe: Stripe | null,
                                paymentFees: number,
                                setPaymentFees: React.Dispatch<React.SetStateAction<number>>,
                                setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
                                setHttpError: React.Dispatch<React.SetStateAction<string | null>>) => {

    const submitPayFees = async () => {

        if (!stripe || !elements || !elements.getElement(CardElement)) {
            return;
        }
        
        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}`;
            
            const url = baseUrl + "/payment/secure/payment-intent";

            const payload: {role: {authority: string}[], sub: string, iss: string, iat: number, exp: number} = jwtDecode(authentication.token);

            const receiptEmail = payload.sub;
            
            const paymentInfo = new PaymentInfoModel(Math.round(paymentFees * 100), "USD", receiptEmail);

            const requestOptions = {

                method: "POST",
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(paymentInfo)
            };

            const response = await fetch(url, requestOptions);

            const responseJson = await response.json();

            if (!response.ok) {
                throw new Error(responseJson.message);
            }

            stripe.confirmCardPayment(

                responseJson.client_secret, 
    
                {payment_method: {
                        card: elements.getElement(CardElement)!,
                        billing_details: {
                            email: receiptEmail
                        }
                    }
                }, 
                
                {handleActions: false}
    
            ).then(

                async function (result: any) {
                
                    if (result.error) {
    
                        setIsLoading(false);
                        setHttpError(result.error.message);
    
                    } else {

                        const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}`;
    
                        const url = baseUrl + "/payment/secure/payment-complete";
    
                        const requestOptions = {
    
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${authentication.token}`,
                                "Content-type": "application/json"
                            }
                        };
    
                        const response = await fetch(url, requestOptions);
    
                        if (!response.ok) {
                            throw new Error(responseJson.message);
                        }
    
                        setPaymentFees(0);
                        setIsLoading(false);
                    }
                }
            );
        }

        setHttpError(null);
        setIsLoading(false);
    }

    submitPayFees().catch(

        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )

};
import { useState } from "react";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { useChangeBookQuantity } from "../../../../utils/useChangeBookQuantity";
import { useDeleteBook } from "../../../../utils/useDeleteBook";
import { FormLoader } from "../../../commons/form_loader/FormLoader";
import { BookModel } from "../../../../models/BookModel";

type ManageBookOptionsBoxProps = {
    book: BookModel,
    setIsBookDeleted: React.Dispatch<React.SetStateAction<boolean>>
}

export const ManageBookOptionsBox = ({ book, setIsBookDeleted }: ManageBookOptionsBoxProps) => {

    const { authentication } = useAuthenticationContext();

    const [totalQuantity, setTotalQuantity] = useState(book.copies);
    const [availableQuantity, setAvailableQuantity] = useState(book.copiesAvailable);

    const [isLoadingChangeQuantity, setIsLoadingChangeQuantity] = useState(false);
    const [isLoadingDeleteBook, setIsLoadingDeleteBook] = useState(false);
    const [changeQuantityHttpError, setChangeQuantityHttpError] = useState<string | null>(null);
    const [deleteBookHttpError, setDeleteBookHttpError] = useState<string | null>(null);

    const handleChangeQuantityClick = (operation: string) => {

        useChangeBookQuantity(`${book.id}`, operation, authentication, setIsLoadingChangeQuantity, setChangeQuantityHttpError, setTotalQuantity, setAvailableQuantity);
    }

    const handleDeleteBookClick = () => {

        useDeleteBook(`${book.id}`, authentication, setIsLoadingDeleteBook, setDeleteBookHttpError, setIsBookDeleted);
    }

    return (

        <div className="book-card-options-box">

            <p className="text-xl font-semibold">Manage book options</p>

            <div className="h-[1px] w-full bg-teal-800" />

            <div className="flex gap-2 items-center text-lg text-center">

                <p>Total copies:</p>
                
                <p className="text-teal-600 font-semibold"> {totalQuantity}</p>

            </div>

            <div className="flex gap-2 items-center text-lg text-center">

                <p>Copies Available:</p>
                
                <p className="text-teal-600 font-semibold"> {availableQuantity}</p>

            </div>

            <div className="flex flex-col gap-5">

                {(isLoadingChangeQuantity || isLoadingDeleteBook) ? <FormLoader isLoading={true} /> :

                    <>

                        {changeQuantityHttpError && 

                            <div className="border border-red-500 py-1 px-2 bg-red-100 rounded-md text-center">
                                {changeQuantityHttpError}
                            </div>

                        }

                        {deleteBookHttpError && 
                        
                            <div className="border border-red-500 py-1 px-2 bg-red-100 rounded-md text-center">
                                {deleteBookHttpError}
                            </div>
                            
                        }

                        <div className="flex gap-3 max-xl:flex-col">

                            <button className="custom-btn-1" onClick={() => handleChangeQuantityClick("increase")}>
                                Increase Quantity
                            </button>

                            <button className="custom-btn-1" onClick={() => handleChangeQuantityClick("decrease")}>
                                Decrease Quantity
                            </button>

                        </div>

                    </>

                }

            </div>

            <div className="h-[1px] w-full bg-teal-800" />

            <button className="custom-btn-2" onClick={handleDeleteBookClick}>
                Delete Book
            </button>

        </div>
    
    )

}
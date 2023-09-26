import { Quote } from "../../commons/quote/Quote"
import { useState } from "react";
import { BookModel } from "../../../models/BookModel";
import { useFetchBooks } from "../../../utils/useFetchBooks";
import { LoadingSpinner } from "../../commons/loading_spinner/LoadingSpinner";
import { SearchPageBookCard } from "./components/SearchPageBookCard";
import { SearchPanel } from "./components/SearchPanel";
import { Pagination } from "../../commons/pagination/Pagination";

export const SearchPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotlalPages] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [titleQuery, setTitleQuery] = useState("");
    const [resultRange, setResultRange] = useState({start: 1, end: 5});
    const [searchParams, setSearchParams] = useState("");

    const handleSearchClick = () => {
        
        if (titleQuery !== "") setSearchParams(`/search/by-title?title-query=${titleQuery}`);
    };

    const handleGenreChange = (value: string) => {

        setTitleQuery("");
        setSelectedGenre(value);
        if (value === "") setSearchParams("");
        if (value !== "") setSearchParams(`/search/by-genre?genre-query=${value}`);
    };
    
    const urlPaginationParams = (searchParams === "" ? "?" : "&") + `page=${currentPage - 1}&books-per-page=5`;

    useFetchBooks(urlPaginationParams, currentPage, setBooks, setIsLoading, setHttpError, setTotalAmountOfBooks, setTotlalPages, searchParams);

    if (isLoading) { return <LoadingSpinner /> }

    if (httpError) { return <div className="mt-[70px]">{httpError}</div> }

    return (

        <section className="mt-[70px] w-full flex flex-col items-center gap-10 max-container px-5 mb-20">

            <Quote quoteId={1} />

            <SearchPanel selectedGenre={selectedGenre} handleGenreChange={handleGenreChange} titleQuery={titleQuery} setTitleQuery={setTitleQuery} handleSearchClick={handleSearchClick} />

            {totalAmountOfBooks > 0 ?
                
                <>

                    <div className="sm:text-xl flex gap-5 items-center justify-center">

                        Books: 

                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">{resultRange.start} - {resultRange.end}</p> 

                        out of 

                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">{totalAmountOfBooks}</p>

                    </div>
                
                    {books.map(

                        book => <SearchPageBookCard key={book.id} book={book} />

                    )}

                </>

                :

                <div>Nothing was found</div>

            }

            <Pagination currentPage={currentPage} totalPages={totalPages} totalAmountOfBooks={totalAmountOfBooks} 
                setCurrentPage={setCurrentPage} setResultRange={setResultRange} 
            />

        </section>

    )

}
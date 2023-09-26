import { genres } from "../../../../constants/constants";

type SearchPanelProps = {
    selectedGenre: string,
    handleGenreChange: (value: string) => void,
    titleQuery: string,
    setTitleQuery: React.Dispatch<React.SetStateAction<string>>,
    handleSearchClick: () => void
}

export const SearchPanel = ({ selectedGenre, handleGenreChange, titleQuery, setTitleQuery, handleSearchClick }: SearchPanelProps) => {

    return (

        <>

            {/* Desktop Search panel */}

            <div className="flex w-full gap-5 max-sm:hidden">

                <select className="dropdown" value={selectedGenre} onChange={event => handleGenreChange(event.target.value)}>

                    <option disabled value="">Search by genre</option>

                    {genres.map(

                        genre => <option key={genre.id} value={genre.value}>{genre.name}</option>

                    )}

                </select>

                <input className="input" placeholder="Search books by title..." value={titleQuery} onChange={event => setTitleQuery(event.target.value)} />

                <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800" onClick={() => handleSearchClick()}>
                    Search
                </button>

            </div>


            {/* Mobile Search panel */}

            <div className="flex flex-col w-full gap-5 sm:hidden">
                
                <input className="input" placeholder="Search books by title..." value={titleQuery} onChange={event => setTitleQuery(event.target.value)} />

                <div className="flex w-full justify-between">

                    <select className="dropdown" value={selectedGenre} onChange={event => handleGenreChange(event.target.value)}>

                        <option disabled value="">Search by genre</option>

                        {genres.map(

                            genre => <option key={genre.id} value={genre.value}>{genre.name}</option>

                        )}

                    </select>

                    <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800" onClick={() => handleSearchClick()}>
                        Search
                    </button>
                    
                </div>

            </div>

        </>

    )

}
import { quotes } from "../../../constants/constants";

type QuoteProps = {
    quoteId: number;
}

export const Quote = ({ quoteId }: QuoteProps) => {

  return (

    <div className="text-teal-800 flex flex-col items-center gap-5 mt-4 max-lg:mt-6 w-full">

        <div className="flex gap-5">
            
            <div className="[clip-path:polygon(97%_0,100%_50%,97%_100%,0%_50%)] lg:w-[450px] md:w-[350px] sm:w-[250px] max-sm:w-[180px] h-[6px] max-md:h-[5px] bg-teal-500" />
            <div className="[clip-path:polygon(50%_0,100%_50%,50%_100%,0%_50%)] w-[10px] h-[8px] bg-teal-500" />
            <div className="[clip-path:polygon(3%_0,100%_50%,3%_100%,0%_50%)] lg:w-[450px] md:w-[350px] sm:w-[250px] max-sm:w-[180px] h-[6px] max-md:h-[5px] bg-teal-500" />

        </div>

        <div className="text-center px-5">

            <p className="italic">"{quotes[quoteId].text}"</p>
            <p>- {quotes[quoteId].author}</p>

        </div>
        
    </div>

  )

}
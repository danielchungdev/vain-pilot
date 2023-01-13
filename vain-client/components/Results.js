import BookCard from "./BookCard";

const Results = ({ books, total }) => {
	
	const createName = ( curr ) => {
		const { fname, lname, nobilitytitle } = curr
		if (nobilitytitle){
			return `${nobilitytitle} ${fname} ${lname}`
		}
		return `${fname} ${lname}`
	}

    return(
        <div className="w-4/6 pb-10 bg-white rounded-md drop-shadow-md border border-slate-300">
            <div className="w-11/12 m-auto">
                <div className="my-5 flex font-bold text-2xl text-zinc-800 ">
                    {total} results
                </div>
                <div className="bg-white drop-shadow-md">
                    {
						books.map( (book) => 
							<BookCard key={book.bookid} author={createName(book)} year={book.year} title={book.title}/>
						)
					}
                </div>
            </div>
        </div>
    )
}

export default Results
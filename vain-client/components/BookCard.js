
import Link from 'next/link'

const BookCard = (props) => {

    return(
        <div className="p-8 flex border-b-2 border-b-slate-300 ">
            <input className="mr-[40px] border-b-2 border-blue-600" type="checkbox"/>
            <div className="block">
				<Link href={`/book/${props.bookid}`}>
                	<h1 className="text-l font-semibold mb-3">{props.title}</h1>
				</Link>
                <div className="text-gray-500 font-normal text-sm">
                    <p>Author: {props.author}</p>
                    <p>Published: {props.year}</p>
                </div>
            </div>
        </div>
    )
}

export default BookCard
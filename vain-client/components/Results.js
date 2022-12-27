import { useState } from "react"
import BookCard from "./BookCard";

const Results = () => {

    const [posts, setPosts] = useState([]);


    return(
        <div className="w-4/6 pb-10 bg-white rounded-md drop-shadow-md border border-slate-300">
            <div className="w-11/12 m-auto">
                <div className="my-5 flex font-bold text-2xl text-zinc-800 ">
                    {posts.length} results
                </div>
                <div className="bg-white drop-shadow-md">
                    <BookCard title="This is a title" author="This is an author" year="2022"/>
                    <BookCard title="This is a title" author="This is an author" year="2022"/>
                    <BookCard title="This is a title" author="This is an author" year="2022"/>
                    <BookCard title="This is a title" author="This is an author" year="2022"/>
                    <BookCard title="This is a title" author="This is an author" year="2022"/>
                    <BookCard title="This is a title" author="This is an author" year="2022"/>

                </div>
            </div>
        </div>
    )
}

export default Results
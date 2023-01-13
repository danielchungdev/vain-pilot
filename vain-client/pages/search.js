import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import Results from "../components/Results"
import Filter from "../components/Filter"
import Head from "next/head"
import axios from "axios"

const search = () => {

	const [books, setBooks] = useState([]);

	const api_uri = process.env.NEXT_PUBLIC_API_LOCAL || "http://localhost:8080"

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(10);

	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts = books.slice(indexOfFirstPost, indexOfLastPost)

	useEffect( () => {
		axios.get(`${api_uri}/books/descriptive`)
			.then( res => {
				console.log(res.data)
				setBooks(res.data)
			})
			.catch( err => {
				console.log(err)
			})
	}, [])

    return (
        <div>
            <Head>
                <title>VAIN | Search</title>
            </Head>
            <main>
                <Navbar/>
                <div className="w-11/12 m-auto mt-20 flex justify-between">
                    <Filter/>
                    <Results books={currentPosts} total={books.length}/>
                </div>
            </main>
        </div>
    )
}

export default search
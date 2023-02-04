import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import Tag from '../../components/Tag'


const Book = () => {
	
	const router = useRouter()
	const {bookid} = router.query

	const [book, setBook] = useState({})

	const api_uri = "http://localhost:8080"

	useEffect( () => {
			if (bookid !== undefined){
				console.log(`${api_uri}/books/${bookid}`)
				axios.get(`${api_uri}/books/${bookid}`)
				.then( res => {
					setBook(res.data[0])
				})
				.catch ( err => {
					console.log(err)
				})
			}
		}
	,[bookid])
	
	const page = (
		<div className='w-11/12 m-auto md:w-8/12 lg:w-6/12 xl:w-5/12'>
			<h1 className='text-2xl font-bold text-neutral-800 mt-5 mb-2'>{book.title}</h1>
			<div className='flex my-5'>
				<Tag text={book.type}/>
				<Tag text={book.subject}/>
			</div>
			<p className='italic text-md my-5'>{book.description}</p>
			<p className='text-neutral-700 font-medium'>By: {book.nobilitytitle ? book.nobilitytitle : null} {book.fname} {book.lname}</p>
			<p>number of pages: {book.numberpages}</p>
			<p>number of volumes: {book.numbervolumes}</p>
		</div>
	)

	return(
		<>
			<Head>
				<title>

				</title>
			</Head>
			<main>
				<Navbar/>
				{ bookid === undefined ? <p>Loading</p> : page }
			</main>
		</>
	)
}

export default Book

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Book = () => {
	
	const router = useRouter()
	const { asPath } = router

	const [bookid, setBookid] = useState(0)

	useEffect( () => {
		setBookid(asPath.split('/')[2])
	}, [asPath])

	useEffect( () => {
		axios.get()
	}, [])

	const page = (
		<p>{bookid}</p>
	)

	return(
		<>{ bookid === 0 ? <p>Loading</p> : <p>{page}</p> }</>
	)
}

export default Book
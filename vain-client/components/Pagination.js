

const Pagination = ({ booksPerPage, totalBooks }) => {

	const pageNumbers = []

	for (let i = 1; i <= Math.ceil(totalBoooks / booksPerPage); i++){
		pageNumbers.push(i);
	}

	return(
		<nav>
			<ul>
				{pageNumbers.map( number =>
					<li key={number}>{number}</li>
				)}
			</ul>
		</nav>
	)
}

export default Pagination
import { useEffect, useState } from "react"
import axios from "axios"

const Filter = ({handleAppliedFilters, handleResetFilters}) => {

	const [subjects, setSubjects] = useState([])
	const [types, setTypes] = useState([])

	const [currentFilters, setCurrentFilters] = useState([])
	
	const api_uri = process.env.NEXT_PUBLIC_API_LOCAL || "http://localhost:8080"

	useEffect( () => {
		axios.get(`${api_uri}/subjects`)
      .then( res => {
        setSubjects(res.data)
      })
      .catch( err => {
        console.log(err)
      })
    
      axios.get(`${api_uri}/types`)
        .then( res => {
          setTypes(res.data)
        })
	}, [])

	const filterChange = (e) => {
		if(e.target.checked){
			setCurrentFilters([...currentFilters, e.target.value])
		}
		else{
			setCurrentFilters(currentFilters.filter(item => item !== e.target.value))
		}
	}

	const resetFilters = (e) => {
		handleResetFilters()
		
	}

    return (
        <div className="w-3/12">
            <button className="w-full h-16 bg-white border border-slate-300 rounded-md text-gray-700 font-semibold drop-shadow-md hover:bg-slate-100 transition duration-200 ease-in-out" onClick={resetFilters}>Reset Filter</button>
			<div className="w-full bg-white border-slate-300 border rounded-md drop-shadow-md p-5 mt-5">
				<h1 className="font-bold text-xl mb-5">Subjects</h1>
				{
					subjects.map((subject, index) => (<p key={index}><input type="checkbox" onChange={filterChange} value={subject.subjectdescription} className="mr-2"/>{subject.subjectdescription}</p>))
				}
				<h1 className="font-bold text-xl my-5">Types</h1>
				{
					types.map((type, index) => (<p key={index}><input type="checkbox" onChange={filterChange} value={type.typedescription} className="mr-2"/>{type.typedescription}</p>))
				}
				<button className="w-full h-16 bg-white border border-slate-300 rounded-md text-gray-700 font-semibold drop-shadow-md mt-5 hover:bg-slate-100 transition duration-200 ease-in-out" onClick={() => handleAppliedFilters(currentFilters)}>Apply Filters</button>
			</div>
		</div>
    )
}

export default Filter
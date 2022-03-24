import { 
    Container, Pagination, Grid, CircularProgress, Box,
    FormControl, InputLabel, Select, Chip, MenuItem, 
    OutlinedInput, Tooltip, Snackbar, IconButton, Alert
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BookCard from '../components/BookCard'
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

export default function Home() {

    //Variables 
    const [books, setBooks] = useState([])
    const [displayBooks, setDisplayBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [typeFilters, setTypeFilters] = useState([])
    const [subjectFilters, setSubjectFilters] = useState([])
    const [yearFilters, setYearFilters] = useState([])
    const [year, setYear] = useState([])
    const [types, setTypes] = useState([])
    const [subject, setSubject] = useState([])
    const [typesObj, setTypesObj] = useState(null)
    const [subjObj, setSubjObj] = useState(null)
    let navigate = useNavigate()  

    //Pagination
    const booksPerPage = 5
    const [totalPaginations, setTotalPaginations] = useState(0)

    //Errors
    const [snackbar, setSnackbar] = useState(null)

    //Checks if user is logged in
    useEffect(() => {
        if (localStorage.getItem('user') === null){
            navigate('/login')
        }
    }, [])

    //Loads all needed data
    useEffect(() => {
        getBooks();

        fetch("http://localhost:5000/types", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            setTypes(data)
            setTypesObj(data.reduce((obj, item) => {
                return {
                    ...obj,
                    [item['type']]: item
                }
            }, {}))
        })
        .catch( err => console.log(err))

        fetch("http://localhost:5000/subjects", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            setSubject(data)
            setSubjObj(data.reduce((obj, item) => {
                return {
                    ...obj,
                    [item['subject']]: item
                }
            }, {}))
        })
        .catch( err => console.log(err))

        fetch("http://localhost:5000/books/year", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            setYear(data)
        })
        .catch( err => console.log(err))

    }, [loading])  

    const getBooks = () => {
        fetch("http://localhost:5000/books", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            setBooks(data)
            setLoading(false)
            pagination(1)
        })
        .catch( err => console.log(err))
    }

    //Pagination Logic
    const pagination = (page) => {
        window.scroll(0,0)
        let totalPaginations = books.length
        let lastPost = booksPerPage * page
        let firstPost = lastPost - booksPerPage
        setDisplayBooks(books.slice(firstPost, lastPost))
        setTotalPaginations(Math.ceil(totalPaginations / booksPerPage))
    }

    //JSX for the loading circle
    const loadingContainer = (
        <Grid 
            container
            justifyContent="center"
            alignItems="center"
            sx={{width: "100%", height: "100%"}}
        >
            <CircularProgress />
        </Grid>
    )
    
    //Gets the filter ID depeding on the filter type
    //Reason: Because the API routes are coded using 
    //        the id and not the value. 
    const getFilterId = (value, type) => {
        if (type === "type"){
            return typesObj[value].type_id
        }
        if (type === "subject"){
            return subjObj[value].subject_id
        }
    }

    //Handles applying filters. Will be in a set to removed duplicates.
    //TODO: - Add all results to a single list
    //      - Check for duplicates
    //      - Make sure data is clean
    //      - Pass data to the Displaybooks and reload. (Will have to updated loading state)
    const applyFilters = () => {
        let typeRoute = 'http://localhost:5000/books/book/type';
        let genreRoute = 'http://localhost:5000/books/book/genre';
        let yearRoute = 'http://localhost:5000/books/years';
        let filteredBooks = []
        let count = typeFilters.length + subjectFilters.length + yearFilters.length;
        if (count > 0) {
            let filtersList = [[...typeFilters], [...subjectFilters], [...yearFilters]]
        }
        else{
            setSnackbar({ children: 'There are not filters!', severity: 'error' });
        }
    }

    //Closes the error toast messages
    const handleCloseSnackbar = () => {
        setSnackbar(null);
    }

    //Sets the filters into it's specific filter list
    const handleChange= (event, type) => {
        const { target: { value }, } = event;
        if(type === 'type'){
            setTypeFilters(
                typeof value === 'string' ? value.split(',') : value,
            );
        }
        if(type === 'subject'){
            setSubjectFilters(
                typeof value === 'string' ? value.split(',') : value,
            );
        }
        if (type === 'year'){
            setYearFilters(
                typeof value === 'string' ? value.split(',') : value,
            );
        }
    };

    //Cleans all the filters
    const removeFilters = () => {
        getBooks()
        setTypeFilters([])
        setSubjectFilters([])
        setYearFilters([])
    }

    //JSX for the general content of the website
    const content = (
        <Container maxWidth="md" >
            <Box component='div' sx={{display: 'flex', margin: '2% 0', alignItems: 'center', justifyContent: 'space-between'}}>
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id="demo-multiple-chip-label">Types</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={typeFilters}
                        onChange={(e) => handleChange(e, 'type')}
                        input={<OutlinedInput id="select-multiple-chip" label="Types" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                    >
                        {
                            types.map((type) => (
                                <MenuItem
                                    key={type.type}
                                    value={type.type}
                                >
                                    {type.type}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id="demo-multiple-chip-label1">Subjects</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label1"
                        id="demo-multiple-chip1"
                        multiple
                        value={subjectFilters}
                        onChange={(e) => handleChange(e,'subject')}
                        input={<OutlinedInput id="select-multiple-chip" label="Subjects" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                    >
                        {
                            subject.map((subject) => (
                                <MenuItem
                                    key={subject.subject}
                                    value={subject.subject}
                                >
                                    {subject.subject}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id="demo-multiple-chip-label2">Year</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label2"
                        id="demo-multiple-chip2"
                        multiple
                        value={yearFilters}
                        onChange={(e) => handleChange(e,'year')}
                        input={<OutlinedInput id="select-multiple-chip" label="Year" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                    >
                        {
                            year.map((year) => (
                                <MenuItem
                                    key={year.year}
                                    value={year.year}
                                >
                                    {year.year}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Tooltip title='Apply filters' disableInteractive>
                    <IconButton onClick={applyFilters}>
                        <DoneIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Remove filters' disableInteractive>
                    <IconButton onClick={removeFilters}>
                        <DoDisturbIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box component='div' sx={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                {
                    displayBooks.map((book, index) => (
                        <BookCard key={index} id={book.id} title={book.title} year={book.year} description={book.description}/>
                    ))
                }
                <Box component='div' sx={{margin: '2%'}}>
                    <Pagination count={totalPaginations} variant="outlined" defaultPage={1} color="primary" onChange={(event, value) => pagination(value)}/>
                </Box>
            </Box>

        </Container>
    )

    return (
        <div>
            <Navbar/>
            {loading ? loadingContainer : content}
            {!!snackbar && (
                <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </div>
    )
}

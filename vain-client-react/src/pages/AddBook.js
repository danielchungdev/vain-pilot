import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

import { Container, Typography, Input, TextareaAutosize,
  Alert, Snackbar, FormControlLabel, Radio, RadioGroup,
  Box, Autocomplete, TextField, Stack, Button 
} from '@mui/material'

const uuid = require('uuid');

export default function AddBook() {
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [located, setLocated] = useState('')
    const [description, setDescription] = useState('')
    const [notes, setNotes] = useState('')
    const [namedPersons, setNamedPersons] = useState('')
    const [selfAuthored, setSelfAuthored] = useState('')

    const [authors, setAuthors] = useState([])
    const [publishers, setPublishers] = useState([])
    const [subjects, setSubjects] = useState([])
    const [types, setTypes] = useState([])

    const [authorsSelected, setAuthorsSelected] = useState([])
    const [publishersSelected, setPublishersSelected] = useState([])
    const [subjectsSelected, setSubjectsSelected] = useState([])
    const [typesSelected, setTypesSelected] = useState([])

    //Error 
    const [snackbar, setSnackbar] = useState(null)

    useEffect(() => {
        
        fetch("http://localhost:5000/namedpersons", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            setAuthors(data)
        })
        .catch( err => console.log(err))

        fetch("http://localhost:5000/publishers", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            setPublishers(data)
        })
        .catch( err => console.log(err))

        fetch("http://localhost:5000/types", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            setTypes(data)
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
            setSubjects(data)
        })
        .catch( err => console.log(err))
    }, [])

    const getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`
        return today
    }

    const handleCloseSnackbar = () => {
        setSnackbar(null);
    }

    const validateInputs = () => {
        if (title === '' || selfAuthored === '' || located === '' || isNaN(parseInt(year))){
            setSnackbar({ children: 'There are empty fields.', severity: 'error' });
            return false
        }
        else{
            return true
        }
    }

    const addingBook = () => {
        if(validateInputs()){
            const book = {
                title: title,
                year: year, 
                description: description,
                notes: notes,
                authorship: selfAuthored,
                namedperson: namedPersons,
                located: located, 
                modifiedby: 'System',
                lastupdated: getCurrentDate()
            }
            fetch('http://localhost:5000/books', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book)
            })
            .then( res => res.json())
            .then( data => {
                let addedBookid = data.rows[0].book_id;

            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div>
            <Navbar/>
            <Container maxWidth="sm" sx={{marginTop: '2%', marginBottom: '10vh'}}>
                <Stack spacing={1}>
                    <Typography align="center" variant="h4">Add Book</Typography>
                    <Typography>Title</Typography>
                    <Input autoComplete="false" margin="dense" placeholder="Enter the title" fullWidth onChange={(e)=>setTitle(e.target.value)}></Input>
                    <Typography>Year</Typography>
                    <Input autoComplete="false" margin="dense" placeholder="Enter the year" fullWidth onChange={(e)=>setYear(e.target.value)}></Input>
                    <Typography>Located</Typography>
                    <Input autoComplete="false" margin="dense" placeholder="Located" fullWidth onChange={(e)=>setLocated(e.target.value)}></Input>
                    <Typography>Description</Typography>
                    <TextareaAutosize
                        aria-label="maximum height"
                        style={{ width: '100%' }}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                    <Typography>Notes</Typography>
                    <TextareaAutosize
                        aria-label="maximum height"
                        style={{ width: '100%' }}
                        onChange={(e)=>setNotes(e.target.value)}
                    />
                    <Typography>Named persons</Typography>
                    <TextareaAutosize
                        aria-label="maximum height"
                        style={{ width: '100%' }}
                        onChange={(e)=>setNamedPersons(e.target.value)}
                    />
                    <Typography>Self Authored?</Typography>
                    {selfAuthored}
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onChange={(e) => setSelfAuthored(e.target.value)}>
                        <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                        <FormControlLabel value="N" control={<Radio />} label="No" />
                        <FormControlLabel value="U" control={<Radio />} label="Unknown" />
                    </RadioGroup>

                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={authors}
                        getOptionLabel={(author) => author.name}
                        onChange={(event, newvalue)=> {
                            setAuthorsSelected(newvalue)
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Author(s)"
                        />
                        )}
                    />
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        key='1'
                        options={publishers}
                        getOptionLabel={(publisher) => publisher.publisher}
                        onChange={(event, newvalue)=> {
                            setPublishersSelected(newvalue)
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Publisher(s)"
                        />
                        )}
                    />
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={subjects}
                        key='2'
                        getOptionLabel={(subject) => subject.subject}
                        onChange={(event, newvalue)=> {
                            setSubjectsSelected(newvalue)
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Subject(s)"
                        />
                        )}
                    />
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={types}
                        key='3'
                        getOptionLabel={(type) => type.type}
                        onChange={(event, newvalue)=> {
                            setTypesSelected(newvalue)
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Type(s)"
                        />
                        )}
                    />
                    <Box sx={{display:'flex', justifyContent: 'center', marginTop: '5%'}}>
                        <Button variant='outlined' onClick={addingBook}>Add Book</Button>
                    </Box>
                </Stack>
                {!!snackbar && (
                <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
            </Container>
        </div>
    )
}

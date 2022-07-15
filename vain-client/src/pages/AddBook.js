import React, { useState, useEffect, Fragment } from 'react'
import Navbar from '../components/Navbar'

import { Container, Typography, Input, TextareaAutosize,
  Alert, Snackbar, FormControlLabel, Radio, RadioGroup,
  Box, Autocomplete, TextField, Stack, Button, Stepper, Step, StepLabel,
  Select, InputLabel, OutlinedInput, FormControl,
  MenuItem,
  createFilterOptions
} from '@mui/material'

const steps = ['Select subject', 'Select Type', 'Book Details', 'Author', 'Publisher'];

export default function AddBook() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [subjects, setSubjects] = useState([])
    const [types, setTypes] = useState([])
    const [authors, setAuthors] = useState([])

    const [bookSubject, setBookSubject] = useState("")
    const [bookType, setBookType] = useState("")
    const [bookAuthor, setBookAuthor] = useState("")

    const authorFilterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 500
    })

    useEffect( () => {
        fetch('http://localhost:8080/subjects', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            setSubjects(data)
        })

        fetch('http://localhost:8080/types', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            setTypes(data)
        })

        fetch('http://localhost:8080/namedpersons', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then( res => res.json())
        .then( data => {
            let authorList = data.map( (x) => {
                return {
                    id: x.namedpersonid, 
                    label: `${x.fname} ${x.lname}`
                }
            })
            setAuthors(authorList)
        })

    }, [])

    const isStepOptional = (step) => {
      return null;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
    
    const onChangeSubject = (event) => {
        const {
            target: {value},
        } = event;
        setBookSubject(value);
    }

    const onChangeType = (event) => {
        const {
            target: {value},
        } = event;
        setBookType(value);
    }

    const onChangeAuthor = (event) => {
        const {
            target: {value},
        } = event;
        setBookAuthor(value);
    }

    const handleReset = () => {
      setActiveStep(0);
    };

    const renderStep = (step) => {
        switch(step){
            case 0:
                return selectSubject;
            case 1:
                return selectType;
            case 2:
                return bookDetails;
            case 3:
                return selectAuthor;
        }
    }

    console.log(authors)

    const selectSubject = (
        <div>
            <Typography sx={{ mt: 2, mb: 1 }}>Select a subject</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="subject-label">Subject</InputLabel>
                <Select
                labelId="subject-label"
                id="subject-label"
                input={<OutlinedInput label="Name" />}
                value={bookSubject}
                onChange={onChangeSubject}
                >
                    {subjects.map((i) => (
                        <MenuItem
                        key={i.subjectid}
                            value={i.subjectid}
                        >
                            {i.subjectdescription}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
    
    const selectAuthor = (
        <div>
            <Typography sx={{ mt: 2, mb: 1 }}>Select Author</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
                <Autocomplete
                    disablePortal
                    id="authorsSelect"
                    options = {authors}
                    filterOptions={authorFilterOptions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Author"/>}
                />
            </FormControl>
            <Typography sx={{ mt: 2, mb: 1 }}>Or insert an author if not found.</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
                <TextField id="outlined-basic" label="Nobility Title" variant="standard" />
                <TextField sx={{mt: 1}} id="outlined-basic" label="Author First Name" variant="standard" />
                <TextField sx={{mt: 1}} id="outlined-basic" label="Author Last Name" variant="standard" />
                <TextField sx={{mt: 1}} id="outlined-basic" label="Life years" variant="standard" />
            </FormControl>

        </div>
    )

    const bookDetails = (
        <div>
            <Typography sx={{ mt: 2, mb: 1 }}>Insert book information</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
                <TextField id="outlined-basic" label="Book title" variant="standard" />
                <TextField sx={{mt: 1}} id="outlined-basic" label="Book edition" variant="standard" />
                <TextField sx={{mt: 1}} id="outlined-basic" label="# of volumes" variant="standard" />
                <TextField sx={{mt: 1}} id="outlined-basic" label="# of pages" variant="standard" />
                <TextField sx={{mt: 1}} id="outlined-basic" label="Format" variant="standard" />
                <TextField
                    sx={{mt: 3}}
                    label="Book description"
                    multiline
                    rows={4}
                />
            </FormControl>
        </div>
    )

    const selectType = (
        <div>
            <Typography sx={{ mt: 2, mb: 1 }}>Select type</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                labelId="type-label"
                id="type-label"
                input={<OutlinedInput label="Name" />}
                value={bookType}
                onChange={onChangeType}
                >
                    {types.map((i) => (
                        <MenuItem
                        key={i.typeid}
                            value={i.typeid}
                        >
                            {i.typedescription}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )

    return (
        <div>
            <Navbar/>
            <Container maxWidth="md" sx={{marginTop: '2%', marginBottom: '10vh'}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                    labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                    );
                }
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                </Box>
                </Fragment>
            ) : (
                <Fragment>
                {renderStep(activeStep)}
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                    Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                    </Button>
                    )}
                    <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
                </Fragment>
                )}
            </Container>
        </div>
    )
}
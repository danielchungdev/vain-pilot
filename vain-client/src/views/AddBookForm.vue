<template>
    <div class="navBar">
        <h1>VAIN</h1>
        <div class="links">
            <router-link to="/">Home</router-link>
            <router-link to="/login">Login</router-link>
            <router-link to="/addBook" class="active">Add Book</router-link>
            <router-link to="/reports">Reports</router-link>
        </div>
    </div>
    <div class="addBook-view">
        <h1 class='formTitle'>Add a New Book</h1>
        <form class="ui-form"> 
            <FormTextField placeholderText="Title" ref="title" />
            <FormTextField placeholderText="Year" ref="year" />
            <FormTextField placeholderText="Located" ref="located" />
            <FormTextArea placeholderText="Description" ref="description" />
            <FormTextArea placeholderText="Notes" ref="notes" />
            <FormTextArea placeholderText="Named Persons" ref="named" />
            <div class="authorship">
                <label class='inputLabel'>Self Authored?</label><br />
                <input type="radio" name="authorship" value="Y" v-model="authorship" /> Yes <br />
                <input type="radio" name="authorship" value="N" v-model="authorship" /> No <br />
                <input type="radio" name="authorship" value="U" v-model="authorship" /> Unknown <br />
            </div><br />
            <FormCheckList headerText="Select Author(s)" listType="author" ref="authors" /><br />
            <FormCheckList headerText="Select Publisher(s)" listType="publisher" ref="publishers" /><br />
            <FormCheckList headerText="Select Subject(s)" listType="subject" ref="subjects" /><br />
            <FormCheckList headerText="Select Type(s)" listType="type" ref="types" />
            <button id='addBookButton' type="button" @click="addBook">Add Book</button><br />
        </form>
    </div>
</template>
<script>
import FormTextField from '../components/FormTextField.vue';
import FormTextArea from '../components/FormTextArea.vue';
import FormCheckList from '../components/FormCheckList.vue';
import axios from 'axios';
 
export default {
    components: {
        FormTextField,
        FormTextArea,
        FormCheckList
    },
    data() {
        return {
            authorship: '',
            bookTypeCount: []
        }
    },
    mounted() {
        
        axios.get('http://localhost:5000/reports/type').then((resp) => {
            this.bookTypeCount = resp.data;
           
        });
    },
    methods: {
        addBook() {
            
            // pull data from form fields
            const title = this.$refs.title.text;
            const year = this.$refs.year.text;
            const description = this.$refs.description.message;
            const notes = this.$refs.notes.message;
            const authors = this.$refs.authors.checkedAuthors;
            const publishers = this.$refs.publishers.checkedPublishers;
            const subject = this.$refs.subjects.checkedSubjects;
            const type = this.$refs.types.checkedTypes;
            const authorship = this.authorship;
            const named = this.$refs.named.message;
            const located = this.$refs.located.text;

            // validate
            // decide on required fields, then verify those are filled in with something
            if (title === '' || year === '' || title === ' ') {
                console.log('stuff is blank my dude');
                return;
            }

            // making sure the year is actually numbers otherwise we get an exception lol
            if (year > 2021 || year < 1) {
                console.log('year must be a number and between 2021 and 0');
                return;
            }

            // add to an array
            var bookvar =  {
                title: title,
                year: year,
                description: description,
                notes: notes,
                authorship: authorship,
                namedpersons: named,
                located: located,
                modifiedby: "System",
                lastupdated: "2021-11-11"
            };
            console.log(bookvar);

            var bookId = null;
            // first send request to add book
            axios.post('http://localhost:5000/books', bookvar)
            .then((resp) => {
                console.log(resp);
                bookId = resp.data.rows[0].book_id;
                if (bookId == null) {
                    return;
                }
                // then send request to add book author (using returned id)
                authors.forEach(author => {
                    var authorvar = {
                        author_id: author.author_id,
                        book_id: bookId // hard coded temporarily
                    };
                    axios.post('http://localhost:5000/bookAuthors', authorvar)
                    .then((resp) => {
                        console.log(resp);
                    }).catch(error => console.error(error.response.data));
                });

                // book types
                type.forEach(t => {
                    var typevar = {
                        type_id: t.type_id,
                        book_id: bookId
                    };
                    axios.post('http://localhost:5000/bookTypes', typevar)
                    .then((resp) => {
                        console.log(resp);
                    }).catch(error => console.error(error.response.data));
                });

                // book publisher
                publishers.forEach(publisher => {
                    var publishervar = {
                        publisher_id: publisher.publisher_id,
                        book_id: bookId // hard coded temporarily
                    };
                    axios.post('http://localhost:5000/bookPublishers', publishervar)
                    .then((resp) => {
                        console.log(resp);
                    }).catch(error => console.error(error.response.data));
                });

                // book subject
                subject.forEach(s => {
                    var subjectvar = {
                        subject_id: s.subject_id,
                        book_id: bookId
                    };
                    axios.post('http://localhost:5000/bookSubjects', subjectvar)
                    .then((resp) => {
                        console.log(resp);
                    }).catch(error => console.error(error.response.data));
                });

                this.$router.push({ name: 'search' });
            }).catch(error => console.error(error.response.data));

        }
    }
};
</script>
<style>
.ui-form {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    outline: 1px solid black;
    border-radius: 5px;
}
.field {
    display: flex;
    flex-direction: column;
    width: 80%;
}
.field:hover .inputLabel {
    color: darkorchid;
}
.inputLabel {
    font-weight: bold;
    font-size: large;
    transition: 0.2s all;
}
#addBookButton {
    background-color: #333333;
    color: white;
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 15px;
    border: none;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
    border-radius: 12px;
    transition: 0.3s;
}
#addBookButton:hover {
    background-color: #737373;
}
.formTitle {
    text-align: center;
    padding: 10px;
    padding-left: 0;
}
</style>

<template>
  <div class="content">
    <div class="navBar">
      <h1>VAIN</h1>
      <div class="links">
        <router-link to="/" class="active">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/addBook">Add Book</router-link>
        <router-link to="/reports">Reports</router-link>
      </div>
    </div>
    <div id="container">
      <div id="filterList">
        <form action="" method="get">
          <SearchCheckBox filterName="Type" ref="type" />
          <SearchCheckBox filterName="Subject" ref="subject" />
          <SearchCheckBox filterName="Year" ref="year" /><br />
          <input class="filterBtns" type="button" value="Apply Filters" @click="applyFilters" /><br />
          <input class="filterBtns" type="button" value="Clear Filters" @click="clearFilters" />
        </form>
      </div>
      <div id="results">
        <div class="books">
          <v-pagination
            v-model="page"
            :pages="Math.round(parseFloat(this.books.length/10))"
            :range-size="1"
            active-color="white"
          />
          <div class="bookcard" v-for="book in books.slice((0 + ((page - 1) * 10)), (page * 10))" :key="book.book_id">
              <h3>{{book.title}}</h3>
              <p><strong>{{book.year}}</strong></p>
              <p>{{book.description}}</p>
              <div class="editButtonDiv">
                <button type="button" class="editButton" :value="book.book_id" @click="editBook(book)">Edit Book</button>
                <button type="button" class="deleteButton" :value="book.book_id" @click="deleteBook(book)">Delete Book</button>
              </div>
          </div>
          <v-pagination
            v-model="page"
            :pages="Math.round(parseFloat(this.books.length/10))"
            :range-size="1"
            active-color="white"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchCheckBox from "../components/SearchCheckBox.vue";
import axios from 'axios';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  components: {
    SearchCheckBox,
    VPagination
  },
  data() {
    return {
      books: [],
      allBooks: [],
      page: 1,
    }
  },
  methods: {
    clearFilters() {
      const typesArray = this.$refs.type.checkedType;
      const subjectsArray = this.$refs.subject.checkedSubjects;
      const yearsArray = this.$refs.year.checkedYears;

      if (typesArray.length > 0) {
        this.$refs.type.checkedType = [];
        this.books = this.allBooks;
      }
      if (subjectsArray.length > 0) {
        this.$refs.subject.checkedSubjects = [];
        this.books = this.allBooks;
      }
      if(yearsArray.length > 0) {
        this.$refs.year.checkedYears= [];
        this.books = this.allBooks;
      }
    },
    applyFilters() {
      // Need to grab all of the data from the filter sections and put them into seperate arrays
      const typesArray = this.$refs.type.checkedType;
      const subjectsArray = this.$refs.subject.checkedSubjects;
      
      const yearsArray = this.$refs.year.checkedYears;
      
      var entireFilteredCollection = [];
      // var tempArray = [];
      var typeRoute = 'http://localhost:5000/books/book/type';
      var genreRoute = 'http://localhost:5000/books/book/genre';
      var yearRoute = 'http://localhost:5000/books/years';

      this.books = [];

      /*
       * In order to get all of the filtered results, we are going to make a seperate call to the api
       * For each filter selected by the user. Once we get the the results of a call, we concat the arrays
       * together and then sort them by thier respective book_id.
       */

      // To Note: Duplicate books are showing up if show up in multiple filters
      // Must be a way to eradicate those before sending data for user to see

      if(typesArray.length !== 0){
        for(let i = 0; i < typesArray.length; i++){
  
          axios.get(typeRoute + "/" + typesArray[i].charAt(0))
          .then((resp) => {
            
            entireFilteredCollection = entireFilteredCollection.concat(resp.data);
            entireFilteredCollection = entireFilteredCollection.sort(this.compare);

            const set = Array.from(new Set(entireFilteredCollection.map(b => b.book_id)))
            .map(book_id => {
              return entireFilteredCollection.find(b => b.book_id === book_id)
            });
            this.books = set;

          })
        }
      }
      if(subjectsArray.length !== 0){
        for(let i = 0; i < subjectsArray.length; i++){
  
          axios.get(genreRoute + "/" + subjectsArray[i].charAt(0))
          .then((resp) => {
            
            entireFilteredCollection = entireFilteredCollection.concat(resp.data);
            entireFilteredCollection = entireFilteredCollection.sort(this.compare);

            const set = Array.from(new Set(entireFilteredCollection.map(b => b.book_id)))
            .map(book_id => {
              return entireFilteredCollection.find(b => b.book_id === book_id)
            });
            this.books = set;
            
          })
        }
      }
      if(yearsArray.length !== 0){
        for(let i = 0; i < yearsArray.length; i++){

          axios.get(yearRoute + "/" + yearsArray[i])
          .then((resp) => {

            entireFilteredCollection = entireFilteredCollection.concat(resp.data);
            entireFilteredCollection = entireFilteredCollection.sort(this.compare);

            const set = Array.from(new Set(entireFilteredCollection.map(b => b.book_id)))
            .map(book_id => {
              return entireFilteredCollection.find(b => b.book_id === book_id)
            });
            this.books = set;
            
          })
        }
      }
      if (typesArray.length == 0 && subjectsArray.length == 0 && yearsArray.length == 0) {
        axios.get("http://localhost:5000/books").then((resp) => {
          this.books = resp.data;
        });
      }

      // this.books = this.sortArray(this.books);
      

      // console.log("types array ->> " + typesArray);
      // console.log("subjects array ->> " + subjectsArray);
      // console.log("years array ->> " + yearsArray);
    },
    compare(a, b) {
      if ( a.book_id < b.book_id ){
        return -1;
      }
      if ( a.book_id > b.book_id ){
        return 1;
      }
      return 0;
    },
    editBook(book) {
      // redirect page with props
      this.$router.push({ name: 'editBook', params: { id: book.book_id, book: JSON.stringify(book) }});

    },
    deleteBook(book) {
      axios.delete(`http://localhost:5000/books/book/${book.book_id}`)
      .then((resp) => {
        console.log(resp.data);
        this.$router.go();
      });
    }
  },
  mounted() {
    axios.get("http://localhost:5000/books").then((resp) => {
      this.books = resp.data;
      this.allBooks = resp.data;
    });
  }
};

</script>
<style scoped>
#filterList {
  padding: 10px;
  display: inline-block;
  background-color: rgb(226, 226, 226);
  border-top: 5px solid #737373;
}

#filterList > form {
  display: flex;
  flex-direction: column;
  justify-content: right;
  min-width: 150px;
  max-width: 200px;
}

#container {
  display: flex;
}

.bookcard {
  min-width: 70%;
  max-width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 0.5px solid black;
  border-radius: 5px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
  padding: 15px;
  background-color: white;
}
.Pagination {
  justify-content: center;
}
.books {
  padding-bottom: 20px;
  padding-top: 20px;
}
#booksSelected {
  text-align: center;
}
.filterBtns {
  width: 100%;
  margin-top: 10px;
  background-color: #333333;
  color: white;
  padding: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s;
}

.filterBtns:hover {
  background-color: #737373;
}

.editButton, .deleteButton {
  background-color: #333333;
  color: white;
  margin: 10px;
  padding: 10px;
  border: none;
  width: 30%;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.3s;
}
.editButton:hover, .deleteButton:hover {
  background-color: #737373;
}

.editButtonDiv {
    display: flex;
    justify-content: flex-end;
}
</style>
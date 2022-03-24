<template>
    <div class="addBook-view">
       
        <h2>Unit Test</h2>
        <form class="ui-form"> 
          
            <button type="button" @click="getAuthor">Get Random Author</button>
            <button type="button" @click="getPublisher">Get Random Publisher</button>
      
            <button type="button" @click="getBook">Get Random Book</button>
            
        </form>
    </div>
     <table class="table table-hover table-bordered mt-5">
    


    <tbody v-for="book in books" :key="book.book_id">
      <tr>
        <th>Book ID</th>
        <td>{{book.book_id}}</td>
      </tr>
        <tr>
        <th>Type</th>
        <td>{{book.type}}</td>
        </tr>
          <tr>
        <th>Had Help</th>
        <td>{{book.authorship}}</td>
        </tr>
          <tr>
        <th>title</th>
        <td>{{book.title}}</td>
        </tr>
        <tr>
        <th>Year</th>
        <td>{{book.year}}</td>
        </tr> 
         <tr>
        <th>Description</th>
        <td>{{book.description}}</td>
         </tr>
          <tr>
        <th>Named Persons</th>
        <td>{{book.namedPersons}}</td>
        </tr>
         <tr>
        <th>Notes</th>
        <td>{{book.notes}}</td>
        </tr>
         <tr>
        <th>Located</th>
        <td>{{book.located}}</td>
        </tr>
         <tr>
        <th>Last Modified By</th>
        <td>{{book.modifiedby}}</td>
        </tr>
         <tr>
        <th>Last Updated</th>
        <td>{{book.lastupdated}}</td>
        </tr>
    
    </tbody>
  </table>

 <table class="table table-hover table-bordered mt-5">
   <tbody v-for="publisher in publishers" :key="publisher.publisher_id">
     
        <tr>
        <th>Publisher</th>
        <td>{{publisher.publisher}}</td>
        </tr>
          <tr>
        <th>Location</th>
        <td>{{publisher.publisherlocation}}</td>
        </tr>
  </tbody>
  </table>

  <table class="table table-hover table-bordered mt-5">
   <tbody v-for="author in authors" :key="author.author_id">
    
        <tr>
        <th>Author Name</th>
        <td>{{author.name}}</td>
        </tr>
          <tr>
        <th>Author Life Years</th>
        <td>{{author.lifeyears}}</td>
        </tr>
  </tbody>
  </table>

    <table class="table table-hover table-bordered mt-5">
   <tbody v-for="type in types" :key="type.type_id">
      <tr>
        <th>Type ID</th>
        <td>{{type.type_id}}</td>
      </tr>
        <tr>
        <th>Type</th>
        <td>{{type.type}}</td>
        </tr>
         
  </tbody>
  </table>

      <table class="table table-hover table-bordered mt-5">
   <tbody v-for="subject in subjects" :key="subject.subject_id">
      <tr>
        <th>Subject ID</th>
        <td>{{subject.subject_id}}</td>
      </tr>
        <tr>
        <th>Type</th>
        <td>{{subject.subject}}</td>
        </tr>
         
  </tbody>
  </table>

</template>
<script>


import axios from 'axios';
//import bookCard from "../components/BookSearchCard.vue";
export default {
   
    data() {
        return {
            authorship: '',
            bookTypeCount: [],
               books: [],
               publishers:[],
               authors:[],
               types:[],
               subjects:[],


        }
    },
    mounted() {
      
    },
    methods: {
        getBook() {
     
            axios.get('http://localhost:3000/books')
            .then((resp) => {
                console.log(resp);
                
                var abook = resp.data;
               
               this.books = abook.filter(function(abook){

                   return abook.book_id ==  Math.floor(Math.random() * 200)
                   
               });

                this.authors = [];
               
                this.types = [];
                this.subjects = [];
               
              
               
            
            }).catch(error => console.error(error.response.data));

        

        },
        getPublisher(){
        
                  axios.get('http://localhost:3000/books')
            .then((resp) => {
                console.log(resp);
                 var abook =resp.data;
               
              this.publishers = abook.filter(function(abook){

                   return abook.book_id ==  Math.floor(Math.random() * 200)
                   
               });
              
                this.authors = [];
                this.books=[];
                this.types = [];
                this.subjects = [];
               
            
            }).catch(error => console.error(error.response.data));
        },

         getAuthor(){
        
                  axios.get('http://localhost:3000/books')
            .then((resp) => {
                console.log(resp);
               
                 var abook =resp.data;
               
              this.authors = abook.filter(function(abook){

                   return abook.book_id ==  Math.floor(Math.random() * 200)
                   
               });
                this.publishers = [];
                this.books=[];
                 this.types = [];
                 this.subjects = [];
               
            
            }).catch(error => console.error(error.response.data));
        }/*,

        getType(){
        
                  axios.get('http://localhost:5000/types')
            .then((resp) => {
                console.log(resp);
               
               this.types = resp.data;
               this.authors=[];
                this.publishers = [];
                this.books=[];
                  this.subjects = [];
               
            
            }).catch(error => console.error(error.response.data));
        },

        getSubject(){
        
                  axios.get('http://localhost:5000/subjects')
            .then((resp) => {
                console.log(resp);
               
               this.subjects = resp.data;
               this.types = [];
               this.authors=[];
                this.publishers = [];
                this.books=[];
               
            
            }).catch(error => console.error(error.response.data));
        }*/
    }
};
</script>
<style scoped>
.addBook-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.form {
    width: 600px;
}
table {
  border-collapse: separate;
  border-spacing: 0;
  border-top: 1px solid #000;
}
td, th {
  margin: 0;
  border: 1px solid #000;
  white-space: nowrap;
  border-top-width: 0px;
}
</style>

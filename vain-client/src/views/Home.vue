<template>
  <div class="books">
    <div class="bookcard" v-for="book in books.slice(0, 5)" :key="book.book_id">
        <h3>{{book.title}}</h3>
        <p><strong>{{book.year}}</strong></p>
        <p>{{book.description}}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      books: [],
    }
  },
  mounted() {
    axios.get("http://localhost:5000/books").then((resp) => {
        this.books = resp.data;
       
    });
  }
};
</script>
<style scoped>
.bookcard {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 0.5px solid black;
  border-radius: 5px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
  padding: 10px;
}
</style>
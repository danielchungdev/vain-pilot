<template>
    <div class="navBar">
      <h1>VAIN</h1>
      <div class="links">
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/addBook">Add Book</router-link>
        <router-link to="/reports" class="active">Reports</router-link>
      </div>
    </div>
    <div class="grid">
      <div class="grid-item"><BarChart dataset="counttype" charttitle="Number of Books Associated with Each Type" /></div>
      <div class="grid-item"><BarChart dataset="countsubject" charttitle="Number of Books Associated with Each Subject" /></div>
      <div class="grid-item"><BarChart dataset="countyear" charttitle="Number of Books Associated with Each Year" /></div>
      <div class="grid-item"><BarChart dataset="countauthorship" charttitle="Number of Books Associated with Authorship" /></div>
    </div>
</template>
<script>
import BarChart from '../components/BarChart.vue';
export default {
    components: {
        BarChart
    }
}
</script>
<style>
  .grid {
    display: grid;
    grid-template-columns: auto;
    margin: auto;
  }

  .grid .grid-item {
    padding: 5%;
  }
</style>
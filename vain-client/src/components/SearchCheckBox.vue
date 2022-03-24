<template>
  <div class="checkbox">
    <h4>{{ filterName }} </h4>
    <div class="list" v-if="filterName == 'Type'">
      <div class="item" v-for="type in types" :key="type.type_id">
        <input
          type="checkbox"
          v-model="checkedType"
          name="type.type"
          :value="type.type_id"
        />
        <label :for="type.type">{{ type.type }}</label>
      </div>

    </div>
    <div class="list" v-else-if="filterName == 'Subject'">
      <div class="item" v-for="subject in subjects" :key="subject.subject_id">
        <input
          type="checkbox"
          v-model="checkedSubjects"
          name="subject.subject"
          :value="subject.subject_id"
        />
        <label :for="subject.subject">{{ subject.subject }}</label>
      </div>
    </div>
    
    <div class="list" v-else-if="filterName == 'Year'">
      <div class="item" v-for="year in years" :key="year.year">
        <input
          type="checkbox"
          v-model="checkedYears"
          name="year.year"
          :value="year.year"
        />
        <label :for="year.year">{{ year.year }}</label>
      </div>
    </div>
    
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    filterName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      types: [],
      subjects: [],
      years: [],
      checkedType: [],
      checkedSubjects: [],
      checkedYears: []
    };
  },
  methods: {
    typeVisible(type) {
      return type;
    },
    getSelectedTypes() {
      return this.data.checkedType;
    },
    toggleDiv() {
      this.display_div = !this.display_div;
    }
  },
  mounted() {
    
    axios.get("http://localhost:5000/types").then((resp) => {
      this.types = resp.data;
    });
    axios.get("http://localhost:5000/subjects").then((resp) => {
      this.subjects = resp.data;
    });
    axios.get("http://localhost:5000/books/year").then((resp) => {
      this.years = resp.data;
    });
  },
};
</script>
<style scoped>
  .checkbox h4 {
    margin-bottom: 5px;
  }
</style>

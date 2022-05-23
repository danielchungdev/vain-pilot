import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import AddBookForm from './views/AddBookForm'
import Reports from './views/Reports'
import SearchPage from './views/SearchPage'
import Signup from './views/Signup';
import Login from './views/Login';
import Home from './views/Home';
import Testing from './views/Testing'
import EditBookForm from './views/EditBookForm';

const app = createApp(App)

app.component('AddBookForm', AddBookForm)
app.component('Reports', Reports)
app.component('SearchPage', SearchPage)
app.component('Login', Login);
app.component('Signup', Signup);
app.component('Home', Home);
app.component('Testing', Testing);
app.component('EditBookForm', EditBookForm)

const routes = [
    { path: '/addBook', component: AddBookForm },
    { component: SearchPage, name:'search', path: "/" },
    { path: '/reports', component: Reports },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/home', component: Home },
    { path: '/unit_test', component: Testing },
    { path: '/editBook/:id', component: EditBookForm, props: true, name: 'editBook' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router);
app.mount('#app')

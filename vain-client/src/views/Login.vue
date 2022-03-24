<template>
  <div>
    <div class="navBar">
        <h1>VAIN</h1>
        <div class="links">
            <router-link to="/">Home</router-link>
            <router-link to="/login" class="active">Login</router-link>
            <router-link to="/addBook">Add Book</router-link>
            <router-link to="/reports">Reports</router-link>
        </div>
    </div>
    <div class="login">
        <h1>Login</h1>
        <form>
            <FormTextField placeholderText="Email" ref="email" />
            <FormTextField placeholderText="Password" ref="pwd" />
            <button id='loginButton' type="button" @click="login">Login</button>
            <button id='createAccountButton' type="button" @click="createAccount">Create an account</button>
            <button id='continueGuest' type="button" @click="guestUser">Continue as Guest</button>
        </form>
       <h3>{{error}}</h3>
    </div>
  </div>
</template>
<script>
import FormTextField from "../components/FormTextField.vue";
import axios from "axios";
var passwordHash = require("password-hash");

export default {
  data() {
    return {
      error: '',
    };
  },
  components: {
    FormTextField
  },
  methods: {
        login() {
          
            const password = this.$refs.pwd.text;
            const email = this.$refs.email.text;

            // check to make sure not null, not worth time rn

            // make some sort of api request
            const loginvar = {
                password: password,
                email: email
            }
            console.log(loginvar);

            axios.post('http://localhost:5000/login', loginvar)
            .then(resp => {
                console.log(resp.data);
                if (resp.data) { //make sure something was returned
                    this.$router.push({ name: 'search' });
                    if(passwordHash.verify(password, password)){ //verify password

                        console.log('PW verifeid');
                        this.$cookies.set("default_unit_second","input_value",0); // session ends when browser is closed
                        this.$cookies.set('user', resp.data); // add user JSON object to cookies
                        this.$router.push({ name: 'search' });
                    
                    }
                    else {
                         this.error = 'Cannot log in with given Username and Password'
                    }
                    // console.log( this.$cookies.get('user').role); //
                }
                else {
                    this.error = 'Cannot log in with given Username and Password'
                }
            })
            .catch(error => console.error(error.response.data));
        },
        createAccount() {
            this.$router.push({ path: '/signup' });
        },
        guestUser() {
            // use guest login info and then redirect
            this.$router.push({ name: 'search' });
        }
    }
  };
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
}
.login form {
    width: 60%;
    padding: 20px;
    outline: 1px solid #333333;
    border-radius: 5px;
    margin-bottom: 20px;
}
.login #loginButton, #createAccountButton, #continueGuest {
    background-color: #333333;
    color: white;
    margin: 10px;
    padding: 15px;
    border: none;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
    border-radius: 12px;
    transition: 0.3s all;
}

.login #loginButton:hover, #createAccountButton:hover, #continueGuest:hover {
    background-color: #737373;
}

.login a {
  display: block;
  text-decoration: none;
  color: #3366ff;
  text-align: center;
}
</style>
<template>
    <div class="signup">
        <h1>Sign Up</h1>
        <form>
            <FormTextField placeholderText="Username" ref="user" />
            <FormTextField placeholderText="First Name" ref="first" />
            <FormTextField placeholderText="Last Name" ref="last" />
            <FormTextField placeholderText="Email" ref="email" />
            <FormTextField placeholderText="Password" ref="pwd" />
            <FormTextField placeholderText="Confirm Password" ref="password" />
            <div class="roles" v-if="roles.length > 0">
                <label class='inputLabel'>User Role:</label><br />
                <div v-for="role in roles" :key="role.role_id">
                    <input type="radio" :name="role.role_id" :value="role.role_id" v-model="selectedRole"/>{{role.role}}
                </div><br />
            </div><br />
            <button id='signupButton' type="button" @click="registerUser">Sign Up</button><br />
            <button id='cancelSignupButton' type="button" @click="cancelSignup">Cancel</button><br />
        </form>
    </div>
</template>
<script>
import FormTextField from '../components/FormTextField.vue';
import axios from 'axios';
var passwordHash = require('password-hash');
export default {
    components: {
        FormTextField
    },
    data() {
        return {
            roles: [],
            selectedRole: ''
        }
    },
    mounted() {
        axios.get('http://localhost:5000/roles').then((resp) => {
            this.roles = resp.data;
        });
    },
    methods: {
        cancelSignup() {
            this.$router.push({ path: '/login' });
        },
        registerUser() {
            // pull data
            const username = this.$refs.user.text;
            const first = this.$refs.first.text;
            const last = this.$refs.last.text;
            const role = this.selectedRole;
            const email = this.$refs.email.text;
            const password = this.$refs.pwd.text
            const hashedPassword = passwordHash.generate(this.$refs.pwd.text);
            const confirmPassword = this.$refs.password.text;
            console.log(password);

            // check that nothing is null, highlight the box that corresponds if so

            // validate that the password and confirm password match
            if (password !== confirmPassword) {
                // display some error message lol
                return;
            }

            const uservar = {
                id: username,
                fname: first,
                lname: last,
                role: role,
                email: email,
                password: hashedPassword
            };

            console.log(uservar);

            // make api request to add a user
            axios.post('http://localhost:5000/users', uservar)
            .then(resp => {

                console.log(resp);

                // login the user and then redirect back to the main page
                this.$router.push({ name: 'search' });
            })
            .catch(error => console.error(error));
        },
        loginUser(email, pwd) {
            const loginvar = {
                email: email,
                password: pwd
            };


            axios.get('http://localhost:5000/login', loginvar)
            .then(resp => {
                console.log(resp);
                this.$router.push({ name: 'search' });
            })
            .catch(error => console.error(error.response.data));
        }
    }
}
</script>
<style scoped>
.signup {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.signup form {
    width: 60%;
    padding: 20px;
    margin-bottom: 20px;
    outline: 1px solid black;
    border-radius: 5px;
}
button {
    background-color: #333333;
    color: white;
    padding: 15px;
    border: none;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
    border-radius: 12px;
    transition: 0.3s;
    margin: 10px;
}

button:hover {
    background-color: #737373;
}
</style>
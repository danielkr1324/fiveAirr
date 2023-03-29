<template>
    <section class="login-background" @click.self="onCloseModal">

        <h2>1123</h2>

        <section class="login" v-if="(typeOfAuth === 'login')">
            <form @submit.prevent="doLogin">
                <h2>Sign In to fiveairr</h2>
                <input typeOfAuth="text" v-model="loginCred.user" placeholder="Username" />
                <input typeOfAuth="text" v-model="loginCred.password" placeholder="Password" />
                <button>Login</button>
                <span>Don't have an account yet?</span><a @click="goToSignup">Open account</a>
            </form>
            <h2>{{ loggedInUser }}</h2>
        </section>

        <section v-if="(typeOfAuth === 'signup')" class="login">
            <form @submit.prevent="doLogin">
                <h2>Join fiveairr</h2>
                <input typeOfAuth="text" v-model="loginCred.user" placeholder="Username" />
                <input typeOfAuth="text" v-model="loginCred.password" placeholder="Password" />
                <button>Login</button>
                <span>Don't have an account yet?</span><a @click="goToSignup">Open account</a>
            </form>
            <h2>{{ loggedInUser }}</h2>
        </section>

    </section>
</template>
  
<script>

export default {
    name: 'LoginSignup',
    props: {
        typeOfAuth: String,
    },
    data() {
        return {
            loginCred: {
                user: '',
                password: '',
            },
        }
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser;
        },
    },
    methods: {
        async doLogin() {
            if (!this.loginCred.username) {
                this.msg = 'Please enter username/password'
                return
            }
            try {
                this.$router.push('/explore')
                await this.$store.dispatch({ typeOfAuth: "login", userCred: { ...this.loginCred } })
                this.close()
            } catch (err) {
                console.log(err)
                this.msg = 'Failed to login'
            }
        },
        loadUsers() {
            this.$store.dispatch({ typeOfAuth: "loadUsers" })
        },
        onCloseModal() {
            this.$emit("closeModal", false)
        },

    },
}
</script> 
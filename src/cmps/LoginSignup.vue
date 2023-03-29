<template>
    <section class="login-background" @click.self="onCloseModal">
        <section class="login" v-if="(type === 'login')">
            <form @submit.prevent="doLogin">
                <h2>Sign In</h2>
                <input type="text" v-model="loginCred.user" placeholder="Username" />
                <input type="text" v-model="loginCred.password" placeholder="Password" />
                <button>Login</button>
                <span>Don't have an account yet?</span><a @click="goToSignup">Open account</a>
            </form>
            <h2>{{ loggedInUser }}</h2>
        </section>

        <section class="login">
            <form @submit.prevent="doLogin" v-if="(type === 'signup')">
                <h2>Join</h2>
                <input type="text" v-model="loginCred.user" placeholder="Username" />
                <input type="text" v-model="loginCred.password" placeholder="Password" />
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
    data() {
        return {
            loginCred: {
                user: '',
                password: '',
            },
            type: null,
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
                await this.$store.dispatch({ type: "login", userCred: { ...this.loginCred } })
                this.close()
            } catch (err) {
                console.log(err)
                this.msg = 'Failed to login'
            }
        },
        loadUsers() {
            this.$store.dispatch({ type: "loadUsers" })
        },
        onCloseModal() {
            this.$emit("closeModal", false)
        },

    },
}
</script> 
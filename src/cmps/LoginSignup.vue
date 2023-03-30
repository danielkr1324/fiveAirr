<template>
    <section class="login-background" @click.self="onCloseModal">

        <h2>1123</h2>

        <section class="login" v-if="(typeOfAuth === 'login')">
            <form @submit.prevent="doLogin">
                <h2>Sign In to fiveairr</h2>
                <input type="text" v-model="loginCred.username" placeholder="Username" />
                <input type="password" v-model="loginCred.password" placeholder="Password" />
                <button>Login</button>
                <!-- <span>Don't have an account yet?</span><a @click="goToSignup">Open account</a> -->
            </form>
        </section>

        <section v-if="(typeOfAuth === 'signup')" class="login">
            <form @submit.prevent="doLogin">
                <h2>Join fiveairr</h2>
                <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
                <input type="text" v-model="signupCred.username" placeholder="Username" />
                <input type="password" v-model="signupCred.password" placeholder="Password" />
                <!-- <ImgUploader @uploaded="onUploaded" /> -->
                <button @click="doSignup">Signup</button>
            </form>
        </section>

    </section>
</template>
  
<script>
import ImgUploader from '../cmps/ImgUploader.vue'

export default {
    name: 'LoginSignup',
    props: {
        typeOfAuth: null,
    },
    data() {
        return {
            loginCred: { username: 'rashin07', password: '1234' },
            signupCred: { username: '', password: '', fullname: '', imgUrl: '' }
        }
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser;
        },
    },
    created() {
        this.loadUsers()
    },
    methods: {
        loadUsers() {
            this.$store.dispatch({ type: "loadUsers" })
        },
        async doLogin() {
            if (!this.loginCred.username) {
                this.msg = 'Please enter username/password'
                return
            }
            try {
                await this.$store.dispatch({ type: "login", userCred: { ...this.loginCred } })
                this.onCloseModal()
            } catch (err) {
                console.log(err)
                this.msg = 'Failed to login'
            }
        },
        async doSignup() {
            if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
                return
            }
            console.log(' signupCred : ', this.signupCred)
            await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
            this.loginCred.username = this.signupCred.username
            this.loginCred.password = this.signupCred.password
            this.doLogin()
            this.$router.push('/')
            this.onCloseModal()
        },
        onCloseModal() {
            this.$emit("closeModal", false)
        },
    },
    components: {
        ImgUploader
    }
}
</script> 
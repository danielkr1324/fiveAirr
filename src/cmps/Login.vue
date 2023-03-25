<template>
    <section class="background">
        <section class="login">
            <form @submit.prevent="doLogin">
                <h2>Login to Fiveaiir</h2>
                <input type="text" v-model="credentials.username" placeholder="Username" />
                <input type="text" v-model="credentials.password" placeholder="Password" />
                <button>Login</button>
                <span>Don't have an account yet?</span><a @click="goToSignup">Open account</a>
            </form>
        </section>
    </section>
</template>
  
<script>

export default {
    name: 'login',
    data() {
        return {
            credentials: {
                username: '',
                password: '',
            },
        }
    },
    computed: {

    },
    methods: {

    },
}
</script> 
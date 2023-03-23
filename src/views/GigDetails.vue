<template>
    <section v-if="gig" class="details main-grid">

        <!-- {{ gig }} -->
        <nav>
            <ul class="details main-nav flex">
                <li>Overview</li>
                <li>About the seller</li>
                <li>Review</li>
            </ul>
        </nav>

        <main class="main">
            <h1 class="title"> {{ gig.title }}</h1>

            <UserPreview :gig="gig" :type="'userShort'" class="user-short" />

            <div class="details-carousel">
                <img :src="gig.imgUrl" alt="gig-pic">
            </div>


            <section class="head-what flex">
                <p>What people loved about this seller</p>
                <a>All reviews</a>
            </section>

            <div class="main-review">
                Main review
            </div>

            <section>
                <p class="about">About This Gig</p>
                <p class="text">{{ gig.description }}</p>
            </section>

            <section class="seller-long-preview">
                <p class="about">About The Seller</p>
                <UserPreview :gig="gig" :type="'userLong'" class="seller-long" />
            </section>

            <section class="reviews">
                All reviews
            </section>

        </main>

        <aside class="aside">

            <head class="order flex">
                <span>Order Details</span>
                <span> US${{ gig.price }} </span>
            </head>

            <p class="description">
                I will active daily 10-14 hours, welcome new members, pin post create, delete spam messages
            </p>

            <p class="delivery">
                <i class="fa-regular fa-clock"></i>
                <span>&nbsp;&nbsp;{{ gig.daysToMake }}</span>
                Days Delivery
            </p>

            <main>

            </main>

            <button class="order-btn">
                Continue
                <span><i class="fa-solid fa-arrow-right"></i></span>
            </button>
        </aside>

    </section>
</template>

<script>

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { gigService } from '../services/gig.service.js'
import { userService } from '../services/user.service.js'
import { reviewService } from '../services/review.service.js'

import UserPreview from '../cmps/UserPreview.vue'

export default {
    name: 'GigDetails',
    data() {
        return {
            gig: null
        }
    },
    methods: {
        async loadGig() {
            try {
                const { gigId } = this.$route.params
                const gig = await gigService.getById(gigId)
                this.gig = gig
            } catch {
                console.log('Could Not load gig')
            }
        },
        goBack() {
            this.$router.push('/explore')
        }
    },
    computed: {
        user() {
            return this.$store.getters.loggedInUser
        },
        reviews() {
            return this.$store.getters.getReviews
        },
    },
    async created() {
        try {
            const user = userService.getLoggedinUser()
            if (user) {
                this.$store.commit({ type: 'login', user })
            }
            await this.loadGig()
            // await this.$store.dispatch({ type: 'getReviews', filterBy: { gigId: this.gig._id } })
        } catch (err) {
            console.error(err)
        }
    },
    mounted() {
        window.scrollTo(0, 0);
    },
    components: {
        VueperSlides,
        VueperSlide,
        UserPreview
    },
}
</script>
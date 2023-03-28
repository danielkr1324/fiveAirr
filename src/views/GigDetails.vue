<template>
    <!-- <section class="main-container full"> -->
    <nav class="details-nav  main-container full">
        <ul class="categories">
            <li class="active">Overview</li>
            <li>About the seller</li>
            <li>Review</li>
        </ul>
    </nav>
    <section v-if="gig" class="details main-grid" :class="{ shadow: isLogin }">


        <main class="main">
            <h1 class="title"> {{ gig.title }}</h1>

            <UserPreview :gig="gig" :type="'userShort'" class="user-short" />

            <section class="details-carousel">
                <section class="slideshow">
                    <vueper-slides ref="vueperslides1" :touchable="false" :autoplay="false" :bullets="false"
                        @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
                        :slide-ratio="(48 / 67)">
                        <vueper-slide v-for="image in gig.images" :key="1" :image="image" style="cursor: pointer">
                        </vueper-slide>
                    </vueper-slides>
                    <div class="thumbnails-slider">
                        <vueper-slides class="no-shadow thumbnails" ref="vueperslides2"
                            @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
                            :visible-slides=gig.images.length :fixed-height="'90px'" :fixed-width="'90px'" :bullets="false"
                            :touchable="false" :gap="1" :arrows="false">
                            <vueper-slide v-for="(image, i) in gig.images" :slide-ratio="(48 / 67)" :key="i" :image="image"
                                style="cursor:pointer" @click.native="$refs.vueperslides2.goToSlide(i)">
                            </vueper-slide>
                        </vueper-slides>
                    </div>
                </section>
            </section>

            <section class="head-what flex">
                <p>What people loved about this seller</p>
                <!-- <a>All reviews</a> -->
            </section>

            <div class="main-review" v-if="gig.reviews">
                <div class="img-small flex align-center justify-center">
                    {{ gig.reviews[0].name[0] }}
                </div>
                <div class="main flex align-center">
                    <span class="username"> {{ gig.reviews[0].name }}</span>
                    <img class="flag" :src="gig.reviews[0].flag">
                    <span class="country"> {{ gig.reviews[0].country }}</span>
                    <span class="space">|</span>
                    <span class="stars" v-for="n in 5">
                        <i class="fa-solid fa-star" style="color: #ffb33e;"></i>
                    </span>
                    <span class="rating">5</span>
                </div>
                <div class="text">
                    {{ gig.reviews[0].review }}
                </div>
                <div class="reviewedAt">
                    {{ gig.reviews[0].reviewedAt }}
                </div>
            </div>

            <section>
                <p class="about">About This Gig</p>
                <p class="text">{{ gig.description }}</p>
            </section>

            <section class="seller-long-preview">
                <p class="about">About The Seller</p>
                <UserPreview :gig="gig" :type="'userLong'" class="seller-long" />
            </section>


            <section v-for="review in gig.reviews">
                <div class="user-review flex">
                    <div class="main flex">
                        <p class="name"> {{ review.name }}</p>
                        <div class="country flex align-center">
                            <img :src="review.flag">
                            <span> {{ review.country }}</span>
                        </div>
                        <p class="text"> {{ review.review }}</p>
                    </div>
                </div>
            </section>

        </main>

        <section class="order-main">
            <aside class="aside">
                <section class="main">

                    <head class="order flex">
                        <span>Order Details</span>
                        <span class="price"> US${{ gig.price }} </span>
                    </head>

                    <p class="description">
                        I will active daily 10-14 hours, welcome new members, pin post create, delete spam messages
                    </p>

                    <p class="delivery">
                        <i class="fa-regular fa-clock"></i>
                        <span>&nbsp;&nbsp;{{ gig.daysToMake }}</span>
                        Days Delivery
                    </p>

                    <ul class="bullets">
                        <li><i class="fa-solid fa-check green">&nbsp;&nbsp;<span>Includes logo design</span></i></li>
                        <li><i class="fa-solid fa-check green">&nbsp;&nbsp;<span>Logo usage guidelines</span></i></li>
                        <li><i class="fa-solid fa-check green">&nbsp;&nbsp;<span>Color palette</span></i></li>
                        <li><i class="fa-solid fa-check green">&nbsp;&nbsp;<span>Iconography</span></i></li>
                        <li><i class="fa-solid fa-check">&nbsp;&nbsp;<span>Do's and don'ts</span></i></li>
                        <li><i class="fa-solid fa-check">&nbsp;&nbsp;<span>Brand book design</span></i></li>
                    </ul>

                    <button class="order-btn" @click="onLogin">
                        <span class="text">Continue</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </section>

            </aside>

            <!-- <button class="contact-btn">Contact Me</button> -->
            <!-- </section> -->

            <Login v-show="isLogin" />
        </section>
    </section>
</template>

<script>

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { gigService } from '../services/gig.service.js'
import { userService } from '../services/user.service.js'
import { reviewService } from '../services/review.service.js'

import UserPreview from '../cmps/UserPreview.vue'
import Login from '../cmps/Login.vue'

export default {
    name: 'GigDetails',
    data() {
        return {
            gig: null,
            isLogin: false
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
        },
        onLogin() {
            this.isLogin = !this.isLogin
            body.classlist.add("dark")
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
        UserPreview,
        Login
    },
}
</script>
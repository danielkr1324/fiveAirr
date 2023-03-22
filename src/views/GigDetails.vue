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

                <!-- <section class="gig-gallery">
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
                                :visible-slides="gig.images.length" :fixed-height="'90px'" :bullets="false"
                                :touchable="false" :gap="1" :arrows="false" :breakpoints="breakpoints">
                                <vueper-slide v-for="(image, i) in gig.images" :slide-ratio="(48 / 67)" :key="i"
                                    :image="image" style="cursor:pointer" @click.native="$refs.vueperslides2.goToSlide(i)">
                                </vueper-slide>
                            </vueper-slides>
                        </div>
                    </section>
                </section> -->

            </div>


            <section class="head-what flex">
                <p>What people loved about this seller</p>
                <a href="#">All reviews</a>
            </section>

            <div class="main-review">
                Main review
            </div>

            <section>
                <p class="about-gig">About This Gig</p>
                <p class="text">{{ gig.description }}</p>
            </section>

            <section class="seller-long-preview">
                <p>About The Seller</p>
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

            <button class="order-btn">
                Continue
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
    components: {
        VueperSlides,
        VueperSlide,
        UserPreview
    },
}
</script>
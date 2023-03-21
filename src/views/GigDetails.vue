<template>
    <section v-if="gig" class="details-grid">

        <nav>
            <ul class="details-main-nav">
                <li>Overview</li>
                <li>About the seller</li>
                <li>Review</li>
            </ul>
        </nav>

        <main class="details-main">
            <p class="details-title"> {{ gig.title }}</p>
            <section class="details-seller-preview">Seller Preview</section>
            <div class="details-carousel">Pics</div>
            <section class="details-head-what">
                <h1>What people loved about this seller</h1>
                <a href="#">All reviews</a>
            </section>
            <div class="details-main-review">Main review</div>
        </main>

        <aside class="details-aside">

            <head class="details-order">
                <span>Order Details</span>
                <span> {{ gig.price }} </span>
            </head>

            <button class="details-order-btn">
                Continue
            </button>
        </aside>

    </section>
</template>

<script>
export default {
    name: 'GigDetails',
    data() {
        return {
            gig: {
                "_id": "i101",
                "title": "I will design your logo",
                "price": 12
            }
        }
    },
    methods: {

    },
    computed: {

    },
    created() {

    },
    components: {

    },
}
</script>
<template>
    <section v-if="gig" class="user-preview flex">

        <!-- SELLER DETAILS SHORT -->
        <section v-if="(type === 'sellerShort')" class="flex">
            <div class="img-small">
                <img :src="gig.owner.imgUrl" alt="seller-img" />
            </div>
            <div class="text-container flex align-center">
                <!-- <router-link to="#aboutSeller"> -->
                <p class="seller-username"> {{ gig.owner.fullname }}</p>
                <!-- </router-link> -->
                <p class="seller-level"> Level {{ gig.owner.rate }} Seller </p>
            </div>
            <i class="fa-solid fa-star" style="color: #ffd43b;">&nbsp;{{ gig.owner.rate }}</i>
        </section>

        <!-- SELLER DETAILS LONG -->
        <!-- <section v-if="(type === 'sellerLong')" class="seller-preview-long flex">
            <div class="img-container">
                <img :src="gig.owner.imgUrl" alt="seller-img" />
            </div>

            <section class="seller-details flex column">
                <section class="name-line flex">
                    <p class="seller-username"> {{ gig.owner.username }}</p>
                    <div class="online-indicator">
                        <span v-icon="'onlineSeller'"></span>
                        <p>Online</p>
                    </div>
                </section>

                <p class="seller-level"> {{ level }} Seller </p>
                <section class="seller-reviews-stat flex align-center">
                    <ul class="stars clean-list flex">
                        <li v-for="n in sellerRate"><span v-icon="'star'" class="flex justify-center align-center"></span>
                        </li>
                    </ul>
                    <p class="rate-score"> {{ gig.owner.rate }} </p>
                    <p class="seller-reviews-count" v-if="gig.reviewers">({{ gig.reviewsCount }})</p>
                </section>
                <button class="contact-me-btn">Contact Me</button>
            </section>
        </section> -->

    </section>
</template>

<script>
export default {
    name: 'SellerPreview',
    props: {
        type: String,
        gig: Object
    },
    computed:
    {
        sellerRate() { //demo data
            return 5
        },
        level() {
            const level = this.gig.owner.level ? `Level ${this.gig.owner.level}` : 'New'
            return level
        }
    },
}
</script>
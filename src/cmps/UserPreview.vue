<template>
    <section v-if="gig" class="user-preview flex">

        <!-- SELLER DETAILS SHORT -->
        <section v-if="(type === 'userShort')" class="flex">
            <div class="img-small">
                <img :src="gig.owner.imgUrl" alt="seller-img" />
            </div>
            <div class="text-container flex align-center">
                <!-- <router-link to="#aboutSeller"> -->
                <p class="seller-username"> {{ gig.owner.fullname }}</p>
                <!-- </router-link> -->
                <p class="seller-level"> Level {{ gig.owner.rate }} Seller &nbsp;</p>
                <div class="flex align-center" v-for="star in gig.owner.rate">
                    <i class="fa-solid fa-star" style="color: #ffb33e;"></i>
                </div>
                <span style="color: #ffb33e">&nbsp;{{ gig.owner.rate }}</span>
            </div>
        </section>

        <!-- SELLER DETAILS LONG -->
        <section v-if="(type === 'userLong')" class="seller-preview-long flex">
            <h1>Long User Preview</h1>
        </section>

        <!-- SELLER LIST MEDIUM -->
        <div v-if="(type === 'listUserPreview')" class="gig-preview-info">
            <div class="seller-img"><img :src="gig.owner.imgUrl"></div>
            <div>
                <p class="bold">{{ gig.owner.fullname }}</p>
                <p class="level">Level 2 Seller</p>
            </div>
        </div>

    </section>
</template>

<script>
export default {
    name: 'UserPreview',
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
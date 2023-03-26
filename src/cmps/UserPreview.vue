<template>
    <section v-if="gig" class="user-preview flex">

        <!-- SELLER DETAILS SHORT -->
        <section v-if="(type === 'userShort')" class="user-preview-short flex">
            <div class="img-small flex align-center">
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
        <section v-if="(type === 'userLong')" class="user-preview-long">
            <div class="main flex">
                <div class="img-large flex align-center">
                    <img :src="gig.owner.imgUrl" alt="seller-img" />
                </div>
                <section class="seller-details">
                    <div class="flex">
                        <p>{{ gig.owner.fullname }}</p>
                        <span class="icon">Online</span>
                    </div>
                    <p>Level {{ gig.owner.rate }} Seller</p>
                    <div class="flex">
                        <div class="flex align-center" v-for="star in gig.owner.rate">
                            <i class="fa-solid fa-star" style="color: #ffb33e;"></i>
                        </div>
                        <span style="color: #ffb33e">&nbsp;{{ gig.owner.rate }}</span>
                    </div>
                    <button class="contact-btn">Contact Me</button>
                </section>
            </div>
            <section class="about-seller">
                <div class="from">
                    <span class="title">From</span>
                    <span class="content">{{ gig.country }}</span>
                </div>
                <div class="member-since">
                    <span class="title">Member since</span>
                    <span class="content">Oct 2020</span>
                </div>
                <div class="response-time">
                    <span class="title">Avg. response time</span>
                    <span class="content">2 hours</span>
                </div>
                <div class="last-delivery">
                    <span class="title">Last delivery</span>
                    <span class="content">About 5 hours</span>
                </div>
                <div class="languages">
                    <span class="title">Languages</span>
                    <span class="content">English</span>
                </div>
                <section class="text">
                    {{ gig.about }}
                </section>
            </section>
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
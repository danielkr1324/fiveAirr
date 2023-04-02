<template>
    <section v-if="user" class="orders main-container full">
        <main class="main-grid">
            <section class="seller-details">
                <div class="user-profile flex column">
                    <img class="user-img" :src="user.imgUrl" alt srcset />
                    <h2>{{ user.fullname }}</h2>
                    <hr />
                    <ul>
                        <li class="flex space-between">
                            <div>
                                <span v-html="getSvg('location')"></span>
                                Country
                            </div>
                            <span>{{ user.country }}</span>
                        </li>
                        <li class="flex space-between">
                            <div>
                                <span v-html="getSvg('member')"></span>
                                Member Since
                            </div>
                            <span>{{ user.joinedAt }}</span>
                        </li>
                        <li class="flex space-between">
                            <RouterLink to="/seller/profile">
                                Your Profile
                            </RouterLink>
                        </li>
                        <li class="flex space-between">
                            <RouterLink to="/seller/dashboard">
                                Seller Dashboard
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="orders-container">
                <div class="header">
                    <h2>Your Orders</h2>
                </div>
                <section class="orders-table">
                    <div class="table-head">
                        <div class="seller">Seller</div>
                        <div class="gig">Gig</div>
                        <div class="date">Order Date</div>
                        <div class="total">Total</div>
                        <div class="status">Status</div>
                    </div>

                    <div class="table-body" v-for="order in orders">
                        <div class="seller"> {{ order.seller.fullname }}</div>
                        <div class="gig">{{ order.gig.name }}</div>
                        <div class="date">{{ order.createdAt }}</div>
                        <div class="total">{{ order.gig.price }}</div>
                        <div class="status">{{ order.status }}</div>
                    </div>
                </section>
            </section>
        </main>
    </section>
</template>

<script>
import { socketService } from '../services/socket.service'
import { svgService } from "@/services/svg.service.js";

export default {
    name: 'UserOrders',
    data() {
        return {
            user: null,
            userOrders: null
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName);
        },
        loadOrders() {
            return this.$store.dispatch({ type: 'loadOrders' })
        },
    },
    computed: {
        orders() {
            this.userOrders = this.$store.getters.buyerOrders
            return this.$store.getters.buyerOrders
        },
    },
    async created() {
        window.scrollTo(0, 0);
        this.loadOrders()
        var loggedinUser = this.$store.getters.loggedinUser;
        await this.$store.dispatch({ type: "loadUser", userId: loggedinUser._id });
        this.user = this.$store.getters.user;
    },
    components: {

    },
}
</script>
<template>
    <section class="dashboard main-container full">
        <section class="dashboard-layout">

            <div class="user-profile flex column">
                <div class="user-profile flex column">
                    <img class="user-img" :src="loggedUser.imgUrl" />
                    <h2> {{ loggedUser.fullname }}</h2>
                    <hr />
                    <ul>
                        <li class="flex space-between">
                            <RouterLink to="/seller/profile">
                                Seller Profile
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="orders">
                <h2 class="headline">Manage Orders</h2>
                <div class="table-head">
                    <h4 class="buyer-col">Buyer</h4>
                    <h4 class="gig-col">Gig</h4>
                    <h4 class="due-on-col">Order Date</h4>
                    <h4 class="total-col">Total</h4>
                    <h4 class="status-col">Status</h4>
                </div>
                <div class="order-table" v-for="order in orders" :order="order" :key="order._id">
                    <span class="buyer-col"> {{ order.buyer.fullname }} </span>
                    <span class="gig-col">{{ order.gig.name }}</span>
                    <span class="due-on-col"></span>
                    <span class="total-col">{{ order.gig.price }}</span>
                    <span class="status-col">{{ order.status }}</span>
                </div>
            </div>

        </section>
    </section>
</template>

<script>

import { svgService } from "@/services/svg.service.js";


export default {
    name: 'SellerDashboard',
    data() {
        return {
            orders: null,
            loggedUser: null,
        }
    },
    methods: {
        loadOrders() {
            this.orders = this.$store.dispatch({ type: "loadOrders" })
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName);
        }
        // loadUser() {
        //     this.user = this.$store.getters.user;
        // }
    },
    computed: {
        orders() {
            return this.$store.getters.sellerOrders;
        },
        // user() {
        //     return this.$store.getters.loggedinUser
        // },
    },
    created() {
        this.loadOrders()
        this.loggedUser = this.$store.getters.loggedinUser
    },
    components: {

    },
}
</script>
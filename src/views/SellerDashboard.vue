<template>
        <main class="dashboard flex">
            <section class="profile-progress">
                <div class="profile flex">
                    <div v-if="loggedUser" class="img-container">
                        <img :src="loggedUser.imgUrl">
                    </div>
                    <div class="user-desc flex">
                        <div class="profile-item">
                            <p class="regular">Positive Rating</p>
                            <p class="bold">100%</p>
                        </div>
                        <div class="profile-item">
                            <p class="regular">Response Time</p>
                            <p class="bold">1 Hrs.</p>
                        </div>
                    </div>
                </div>
                <div class="progress">
                    <article class="progress-item">
                        <div class="progress-txt flex">
                            <p class="bold">Response Rate</p>
                            <p v-if="(orders.length > 0)">{{ responseRate }}%</p>
                        </div>
                        <el-progress v-if="(orders.length > 0)" :percentage="responseRate" color="#1dbf73" />
                    </article>
                    <article class="progress-item">
                        <div class="progress-txt flex">
                            <p class="bold">Orders Completed</p>
                            <p v-if="(orders.length > 0)">{{ completedOrderPercent }}%</p>
                        </div>
                        <el-progress v-if="(orders.length > 0)" :percentage="completedOrderPercent" color="#1dbf73" />
                    </article>
                    <article class="progress-item">
                        <div class="progress-txt flex">
                            <p class="bold">Delivered on Time</p>
                            <p v-if="(orders.length > 0)">{{ deliveredOnTime }}%</p>
                        </div>
                        <el-progress v-if="(orders.length > 0)" :percentage="deliveredOnTime" color="#1dbf73" />
                    </article>
                </div>
            </section>
            <section class="seller-orders flex">
                <div class="income-order-dashboard flex">
                    <div class="dashboard-item">
                        <span class="light">Annual Revenue</span>
                        <h3 v-if="(orders.length > 0)">${{ annualIncome }}</h3>
                    </div>
                    <div class="dashboard-item">
                        <span class="light">Monthly Revenue</span>
                        <h3 v-if="(orders.length > 0)">${{ monthIncome }}</h3>
                    </div>
                    <div class="dashboard-item">
                        <span class="light">Completed Orders </span>
                        <h3 v-if="(orders.length > 0)">{{ annualOrdersComplete }}</h3>
                    </div>
                    <div class="dashboard-item">
                        <span class="light">Pending Orders </span>
                        <h3 v-if="(orders.length > 0)">{{ pendingOrders }}</h3>
                    </div>
                </div>
                <h2 class="headline">Manage Orders</h2>
                <div class="order-table">
                    <div class="table-head flex">
                        <div class="buyer-col">
                            <h4>Buyer</h4>
                        </div>
                        <div class="gig-col">
                            <h4>Gig</h4>
                        </div>
                        <div class="due-on-col">
                            <h4>Date</h4>
                        </div>
                        <div class="total-col">
                            <h4>Total</h4>
                        </div>
                        <div class="status-col">
                            <h4>Status</h4>
                        </div>
                        <div></div>
                    </div>
                    <order-list  v-for="order in orders" :order="order" :key="order._id"
                        @change="changeStatus" />
                </div>
            </section>
        </main>
</template>

<script>
import { socketService } from '../services/socket.service'
import OrderList from '../cmps/orderList.vue'
export default {
    name: 'seller-orders',
    components: {
        OrderList,
    },
    data() {
        return {
            selectedOrder: null,
            deliveredOnTime: 95,
            responseRate: 95,
            loggedUser: null,
        }
    },
    created() {
        this.loadOrders()
        this.loggedUser = this.$store.getters.loggedinUser
        window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    methods: {
        loadOrders() {
            return this.$store.dispatch({ type: 'loadOrders' })
        },
        selectOrder(order) {
            this.selectedOrder = { ...order }
            
            this.toggleSet()
        },
        toggleSet() {
            this.setOpen = !this.setOpen
        },
        changeStatus({ status, order }) {
            this.selectOrder(order)
            this.selectedOrder.status = status
            this.$store.dispatch({ type: 'saveOrder', order: this.selectedOrder })
            socketService.emit('order-changed-status', this.selectedOrder.buyer)
        },
    },
    computed: {
        orders() {
            return this.$store.getters.sellerOrders
        },
        annualIncome() {
            var income = 0
            this.orders.forEach(order => {
                if (order.status === "Completed") { income += order.gig.price }
            })
            return income
        },
        monthIncome() {
            var income = 0
            this.orders.forEach(order => {
                if (order.status === "Completed") { income += order.gig.price }
            })
            return income
        },
        pendingOrders() {
            var pending = 0
            this.orders.forEach(order => {
                if (order.status === "Pending") { pending++ }
            })
            return pending
        },
        annualOrdersComplete() {
            var complete = 0
            this.orders.forEach(order => {
                if (order.status === "Completed") { complete++ }
            })
            return complete
        },
        monthOrdersComplete() {
            var complete = 0
            this.orders.forEach(order => {
                if (order.status === "Complete") { complete++ }
            })
            return complete
        },
        completedOrderPercent() {
            return Math.round(((this.annualOrdersComplete / this.orders.length) * 100))
        },
    },
}
</script>
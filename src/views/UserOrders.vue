<template>
    <main class="dashboard flex">
            
            <section class="seller-orders flex">
                
                <h2 class="headline">My Orders</h2>
                <div class="order-table">
                    <div class="table-head flex">
                        <div class="buyer-col">
                            <h4>Seller</h4>
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
                    <div v-for="order in orders"  class="table-entity flex">
            <div class="buyer-col flex column align-center user-col">
                <img :src="order.seller.imgUrl" />
                <p class="regular">{{ order.seller.fullname }}</p>
            </div>
            <div class="gig-col flex column">
                <span class="table-span regular">{{ order.gig.name }}</span>
            </div>
            <div class="due-on-col flex column">
                <span class="table-span regular">
                    {{ new Date(order.createdAt).toLocaleDateString() }}
                </span>
            </div>
            <div class="total-col flex column">
                <span class="table-span regular">US${{ order.gig.price }}</span>
            </div>
            <div @click="toggleSet()" class="status-col flex column">
                <div class="status flex" >
                    <span class="regular" style="color:grey">{{ order.status }}</span>
                </div>
            </div>
            
        </div>
                </div>
            </section>
        </main>
        
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

// <section class="order-table">
//                     <div class="table-head flex">
//                         <div class="buyer-col">
//                             <h4>Buyer</h4>
//                         </div>
//                         <div class="gig-col">
//                             <h4>Gig</h4>
//                         </div>
//                         <div class="due-on-col">
//                             <h4>Date</h4>
//                         </div>
//                         <div class="total-col">
//                             <h4>Total</h4>
//                         </div>
//                         <div class="status-col">
//                             <h4>Status</h4>
//                         </div>
//                         <div></div>
//                     </div>

                    
//                 </section>


</script>
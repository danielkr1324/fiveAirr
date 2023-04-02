<template>
    <section>
        <div class="table-entity flex">
            <div class="buyer-col flex column align-center user-col">
                <img :src="order.buyer.imgUrl" />
                <p class="regular">{{ order.buyer.fullname }}</p>
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
                <div class="status flex" :class="className(order.status)">
                    <span class="regular">{{ order.status }}</span>
                </div>
            </div>
            <div @click.self="toggleSet">
                <div v-if="setOpen" class="set-status" >
                    <div class="completed status" @click="changeStatus('Completed')">
                        Completed
                    </div>
                    <div class="in-progress status" @click="changeStatus('In Progress')">
                        In Progress
                    </div>
                    <div class="rejected status" @click="changeStatus('Rejected')">
                        Rejected
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        order: Object
    },
    data() {
        return {
            setOpen: false,
        }
    },
    methods: {
        className(str) {
            if (str === 'Pending') return 'pending'
            if (str === 'Completed') return 'completed'
            if (str === 'In Progress') return 'in-progress'
            if (str === 'Rejected') return 'rejected'
        },
        toggleSet() {
            this.setOpen = !this.setOpen
        },
        changeStatus(status) {
            this.$emit('change', { status, order: this.order })
            this.toggleSet()
        },
    },
}
</script>
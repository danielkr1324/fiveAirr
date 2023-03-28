<template>
    <section class="profile main-container full">
        <main class="main-grid">
            <section class="seller-details">
                Details
            </section>

            <section class="orders">
                Active Gigs
                {{ gig }}
            </section>

            <section class="statistics">
                Description
            </section>
        </main>
    </section>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            gig: Object
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

    },
    computed: {

    },
    created() {

    },
    components: {

    },
}
</script>
<template>
    <section v-if="gig" class="gig-details">
        <div class="gig-details__details grid">
            {{ gig }}
        </div>
        <aside class="gig-summary">

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
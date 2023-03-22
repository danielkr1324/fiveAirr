<template>
    <li class=gig-preview>
       <div class="preview-preview-img"> <img  :src="gig.imgUrl"> </div>

        <div class="gig-preview-info">
            <div class="seller-img"><img :src="gig.owner.imgUrl"></div>
            <div>
                <p class="bold">{{ gig.owner.fullname }}</p>
                <p class="level">Level 2 Seller</p>
            </div>
        </div>

        <div class="gig-preview-title">
            <router-link :to="`/details/${gig._id}`">
                <a>{{ gig.title }}</a>
            </router-link>
            <i class="fa-solid fa-star" style="color: #ffd43b;">&nbsp;{{gig.owner.rate}}</i>
        </div>

        <footer class="gig-footer">
            <i class="fa-solid fa-heart" style="color: #b5b6ba;"></i>
            <p>STARTING AT<span class="gig-preview-price"> US${{gig.price}}</span></p>
        </footer>
      
      
    </li>
</template>

<script>
export default {
name: 'GigExplorePreview',
props: {gig: Object},
data() {
return {

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

<style>

</style>
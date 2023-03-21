<template>
    <li class=gig-explore-preview>
       <div > <img class="preview-img" :src="gig.imgUrl"> </div>

       <div class="owner-info">
        <img class="owner-img" :src="gig.owner.imgUrl" alt="">
        <div>
            <p>{{ gig.owner.fullname }}</p>
            <p>Level 2 Seller</p>
        </div>
       </div>

       <p class="gig-title">{{gig.title}}</p>
       <i class="fa-solid fa-star" style="color: #ffd43b;">{{gig.owner.rate}}</i>

        <div class="gig-bottom">
            <i class="fa-solid fa-heart" style="color: #b5b6ba;"></i>
            <p>STARTING AT $<span>{{gig.price}}</span></p>
        </div>
      
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
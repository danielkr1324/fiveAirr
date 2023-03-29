<template>
    <section v-if="gigToEdit" class="gig-edit main-container full">
        <form @submit.prevent="saveGig">
            <div class="top-form">
                <label class="edit-title">
                    <span >Gig Title
                        <p>As your Gig storefront, your title is the most important place to include keywords
                            that buyers would likely use to search for a service like yours.
                        </p>
                    </span>
                    <input v-model="gigToEdit.title" type="text" placeholder="I will..." />
                </label>
                <label class="edit-title">
                    <span>Description
                        <p>Briefly Describe Your Gig</p>
                    </span>
                    <textarea v-model="gigToEdit.description"
                        placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry...."> </textarea>
                </label>
            </div>
            <div class="bottom-form">
                <label class="category">
                    <span >Category
                        <p>Choose the category most suitable for your Gig.</p>
                    </span>
                    <select v-model="gigToEdit.category" name="Graphics and Design" id="">
                        <option value="Graphics & Design">Graphics & Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Writing & Translation">Writing & Translation</option>
                        <option value="Video & Animation">Video & Animation</option>
                        <option value="Music & Audio">Music & Audio</option>
                        <option value="Programming & Tech">Programming & Tech</option>
                        <option value="Busines">Busines</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Data">Data</option>
                        <option value="Photography">Photography</option>
                    </select>
                </label>
                <label class="category">
                    <span>Days to Make
                        <p>Days it will take you on average to finish this gig</p>
                    </span>
                    <select name="" id="" v-model="gigToEdit.daysToMake">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label class="category">
                    <span>Price
                        <p>Price you're offering for this gig</p>
                    </span>
                    <input v-model="gigToEdit.price" type="number" name="" id="">
                </label>
            </div>
            <div class="images">
                <span>Upload Images
                    <p>Encourage buyers to choose your Gig by featuring a variety of your work.</p>
                </span>
                <ImgUploader @uploaded="onUploaded" :images="gigToEdit.images"></ImgUploader>
            </div>
        </form>
        <div class="btn">
            <button class="cancel-btn" @click="returnToProfile">Cancel</button>
            <button class="save-btn" @click="saveGig">Save</button>
        </div>
    </section>
</template>
<script>

import { gigService } from "../services/gig.service.local"
import ImgUploader from "../cmps/ImgUploader.vue"

export default {
    name: 'GigEdit',
    components: { ImgUploader },
    async created() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.user = this.$store.getters.loggedinUser
        const { _id } = this.$route.params
        if (_id) {
            gigService.getById(_id).then((gig) => {
                this.gigToEdit = gig
                console.log(this.gigToEdit)
            })
        }
        else {
            this.gigToEdit = gigService.getEmptyGig({ owner: { _id: this.user._id, username: this.user.username, level: this.user.level, rate: this.user.rate } })
        }
    },
    data() {
        return {
            gigToEdit: null,
            user: null
        }
    },
    methods: {
        async saveGig() {
            await this.$store.dispatch({ type: "addGig", gig: { ...this.gigToEdit } })
            this.$router.push('/seller/profile')
        },
        onUploaded(images) {
            this.gigToEdit.images = images
        },
        returnToProfile() {
            this.$router.push('/seller/profile')
        }
    },
}
</script>
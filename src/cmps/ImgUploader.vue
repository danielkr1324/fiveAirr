<template>
  <section class="img-uploader">
    <label class="upload-container">Upload a file</label>
    <label for="imgUpload"></label>
    <input type="file" @change="uploadImg" accept="img/*" id="imgUpload" />

    <div className="upload-preview flex">
      <div v-for="img in images" :key="img" class="img-container">
        <img v-if="images" :src="imgUrl" :style="{ maxWidth: '200px', float: 'right' }"/>
      </div>
    </div>
  </section>
</template>

<script>
import { uploadService } from '../services/upload.service.js'

export default {
  props: ['images'],
  data() {
    return {
      imgUrl: null,
      height: 500,
      width: 500,
      isUploading: false
    }
  },
  methods: {
    async uploadImg(ev) {
      this.isUploading = true
      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      this.isUploading = false
      this.images.push(secure_url)
      this.height = height
      this.width = width
      this.$emit('uploaded', this.images)
    }
  },
  computed: {
    uploadMsg() {
      if (this.imgUrl) return 'Upload Another?'
      return this.isUploading ? 'Uploading....' : 'Upload Image'
    }
  }
}
</script>

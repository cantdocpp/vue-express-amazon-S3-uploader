<template lang="html">
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <simple-upload />
        </div>
        <div class="column">
          <multiple-uploads />
        </div>
      </div>
      <Dropzone />
      <BulkUpload />
    </div>
  </div>
</template>

<script>
import SimpleUpload from './components/SimpleUpload.vue'
import MultipleUploads from './components/MultipleUploads.vue'
import Dropzone from './components/Dropzone.vue'
import BulkUpload from './components/BulkUpload.vue'

export default {
  name: 'App',
  components: {
    SimpleUpload,
    MultipleUploads,
    Dropzone,
    BulkUpload
  }
}
</script>

<style lang="css">
</style>

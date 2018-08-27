<template lang="html">
  <form enctype="multipart/form-data" @submit.prevent="sendFile">
    <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
      <div class="message-body">
        {{message}}
      </div>
    </div>
    <div class="field">
      <div class="file is-boxed is-primary">
        <label class="file-label">
          <input type="file" @change="selectFile" ref="file" class="file-input">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fa fa-upload"></i>
            </span>
            <span class="file-label">
              chose a file...
            </span>
          </span>
          <span v-if="file" class="file-name">{{file.name }}</span>
        </label>
      </div>
    </div>
    <div class="field">
      <button class="button is-info">Send</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'simpleUpload',

  data() {
    return {
      file: "",
      message: "",
      error: false
    }
  },

  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0]
      this.error = false
      this.message = ""
    },

    sendFile() {
      let formData = new FormData()
      formData.append('file', this.file)
      var self = this
      axios.post('http://localhost:3000/image/upload', formData)
      .then(function(response) {
        console.log(response);
        self.message = "File has been uploaded"
        self.file = ""
        self.error = false
      })
      .catch(function(err) {
        self.message = "Something went wrong"
        self.error = true
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>

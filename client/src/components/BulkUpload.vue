<template lang="html">
  <form enctype="multipart/form-data" @submit.prevent="sendFile">
    <input type="file" ref="file1" @change="selectFile1">
    <input type="file" ref="file2" @change="selectFile2">
    <input type="file" ref="file3" @change="selectFile3">
    <div class="field">
      <button class="button is-info">Send</button>
    </div>
  </form>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'BulkUpload',

  data() {
    return {
      file: "",
      message: "",
      error: false,
      sendFiles: []
    }
  },

  methods: {
    selectFile1() {
      this.file = this.$refs.file1.files[0]
      this.sendFiles.push(this.file)
      console.log(this.sendFiles);
      this.error = false
      this.message = ""
    },

    selectFile2() {
      this.file = this.$refs.file2.files[0]
      this.sendFiles.push(this.file)
      console.log(this.sendFiles);
      this.error = false
      this.message = ""
    },

    selectFile3() {
      this.file = this.$refs.file3.files[0]
      this.sendFiles.push(this.file)
      console.log(this.sendFiles);
      this.error = false
      this.message = ""
    },

    sendFile() {
      console.log(this.sendFiles);
      let formData = new FormData()
      _.forEach(this.sendFiles, file => {
        formData.append('files', file)
      })
      console.log(formData);
      // formData.append('file', this.sendFile)
      var self = this
      axios.post('http://localhost:3000/image/bulkupload', formData)
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

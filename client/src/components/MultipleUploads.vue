<template lang="html">
  <form enctype="multipart/form-data" @submit.prevent="sendFile">
    <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
      <div class="message-body">
        {{message}}
      </div>
    </div>
    <div class="field">
      <div class="file is-boxed is-warning">
        <label class="file-label">
          <input multiple type="file" @change="selectFile" ref="files" class="file-input">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fa fa-upload"></i>
            </span>
            <span class="file-label">
              chose a file...
            </span>
          </span>
        </label>
      </div>
    </div>
    <div class="field">
      <div v-for="(file, index) in files" :key="index" :class="`level ${file.invalidMessage && 'has-text-danger'}`">
        <div class="level-left">
          <div class="level-item">
            {{file.name}}
            <span v-if="file.invalidMessage">&nbsp;- {{file.invalidMessage}}</span>
          </div>
        </div>
        <div class="level-right">
          <a @click.prevent="files.splice(index, 1);uploadFiles.splice(index, 1)" class="delete"></a>
        </div>
      </div>
    </div>
    <div class="field">
      <button class="button is-info">Send</button>
    </div>
  </form>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'MultipleUploads',

  data() {
    return {
      files: [],
      message: "",
      error: false,
      uploadFiles: []
    }
  },

  methods: {
    selectFile() {
      const files = this.$refs.files.files
      console.log(files);
      this.uploadFiles = [...this.uploadFiles, ...files]

      this.files = [
        ...this.files,
        ..._.map(files, file => ({
          name: file.name,
          size: file.size,
          type: this.type,
          invalidMessage: this.validate(file)
        }))
      ]
    },

    validate(file) {
      const max_size = 2000000
      const allowedTypes = ["image/jpeg", "image/jpg", "image/gif", "image/png"]
      if (file.size > max_size) {
        return `max_size: ${max_size/1000}kb`
      }

      if (!allowedTypes.includes(file.type)) {
        return 'Not an Image'
      }
      return ""
    },

    sendFile() {
      const formData = new FormData()
      var self = this
      _.forEach(this.uploadFiles, file => {
        console.log(this.uploadFiles);
        console.log(this.validate(file));
        if (this.validate(file) == "") {
          formData.append('files', file)
        }
      })

      axios.post('http://localhost:3000/image/multiple', formData)
      .then(function(response) {
        self.message = "Files has been uploaded"
        self.files = []
        self.upload = []
        console.log(response);
      })
      .catch(function(err) {
        self.message = err.response.data.error
        self.error = true
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>

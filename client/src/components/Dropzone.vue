<template lang="html">
  <form enctype="multipart/form-data" @submit.prevent="sendFile">
    <div v-if="message" :class="`message ${error ? 'is-danger' : 'is-success'}`">
      <div class="message-body">
        {{message}}
      </div>
    </div>
    <div class="dropzone">
      <input type="file" class="input-file" ref="file" @change="sendFile" />
      <p v-if="!uploading" class="call-to-action">
        Drag your files here
      </p>
      <p v-if="uploading" class="progress-bar"></p>
    </div>

  </form>
</template>

<script>
export default {
  name: 'Dropzone',

  data() {
    return {
      file: "",
      message: "",
      error: false,
      uploading: false,
      uploadedFiles: [],
      progress: 0
    }
  },

  methods: {
    sendFile() {
      const file = this.$refs.file.files[0]
      let formData = new FormData()
      formData.append('file', file)
      var self = this
      axios.post('http://localhost:3000/image/dropzone', formData)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .dropzone {
    min-height: 200px;
    padding: 10px 10px;
    position: relative;
    cursor: pointer;
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
  }

  .input-file {
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropzone:hover {
    background: lightblue;
  }

  .dropzone .call-to-action {
    font-size: 1.2rem;
    text-align: center;
    padding: 70px 0
  }
</style>

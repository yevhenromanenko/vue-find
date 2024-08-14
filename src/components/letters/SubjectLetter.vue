<script>
import Tags from "@/components/tags/Tags.vue";
import {addTagToInput} from "@/functions/mass-letter/addTagToInput.js";

export default {
  name: "SubjectLetter",
  props: ['input'],
  components: { Tags },
  data() {
    return {
      inputElement: null
    };
  },
  mounted() {
    this.inputElement = this.$refs.subjectInput;
  },
  methods: {
    addTagToInput
  }
}
</script>

<template>
  <div class="form-control-find" :class="{ invalid: !input.isValid }">
    <tags :addTags="addTagToInput"></tags>
    <input class="input-letter" type="text" id="subject" v-model.trim="input.val" placeholder="Тема листа" ref="subjectInput" />
    <p v-if="!input.isValid">Тема має бути більше 5 символів.</p>
  </div>
</template>

<style scoped>
.form-control-find {
  margin: 5px 0;
}

.input-letter {
  display: block;
  width: 98%;
  height: 30px;
  border: 1px solid #ccc;
  font: inherit;
}

.input-letter:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

.input-letter[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

.input-letter[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}
</style>

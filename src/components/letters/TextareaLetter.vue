<script>
import Tags from "@/components/tags/Tags.vue";
import {addTagToInput} from "@/functions/mass-letter/addTagToInput.js";

export default {
  name: "TextareaLetter",
  components: {Tags},
  props: ['input'],
  data() {
    return {
      inputElement: null
    };
  },
  mounted() {
    this.inputElement = this.$refs.letterInput;
  },
  methods: {
    addTagToInput,
  }
}
</script>

<template>
  <div class="form-control-find" :class="{invalid: !input.isValid}">
    <tags :addTags="addTagToInput"></tags>
    <textarea class="textarea-letter" id="letter" v-model.trim="input.val" placeholder="Лист для розсилки" ref="letterInput"></textarea>
    <p v-if="!input.isValid">Лист має бути більше 200 символів.</p>
  </div>
</template>

<style scoped>
.form-control-find {
  margin: 5px 0;
}


.textarea-letter {
  display: block;
  width: 98%;
  height: 220px;
  border: 1px solid #ccc;
  font: inherit;
}


.textarea-letter:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

</style>

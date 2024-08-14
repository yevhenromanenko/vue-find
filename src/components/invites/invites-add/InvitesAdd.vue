<script>
import {addTag} from "@/functions/tags/addTag.js";
import Tags from "@/components/tags/Tags.vue";
import {addInvite} from "@/functions/invites/addInvite.js";

export default {
  name: "InvitesAdd",
  components: {Tags},
  inject: ['invites'],
  data() {
    return {
      inviteText: "",
      inviteType: "",
      isBirthday: false,
      isMyMan: false,
      isPhoto: false,
      isNoPhoto: false,
      inviteOptions: [
        { value: "", text: "Оберіть тип інвайту" },
        { value: "personal", text: "Персональний інвайт" },
        { value: "birthday", text: "Для тих, у кого день нарождення сьогодні" },
        { value: "photo", text: "Для тих, у кого є фото в профілі" },
        { value: "nophoto", text: "Для тих, у кого нема фото в профілі" },
      ]
    };
  },
  watch: {
    inviteType(newType) {
      this.isBirthday = (newType === "birthday");
      this.isMyMan = (newType === "personal");
      this.isPhoto = (newType === "photo");
      this.isNoPhoto = (newType === "nophoto");
    }
  },
  computed: {
    ladyId() {
      return this.$store.getters.loadedLadyId;
    }
  },
  methods: {
    addInvite,
    addTagToInvite(tag) {
      const inputElement = this.$refs.inviteInput;
      addTag(tag, inputElement);
      this.inviteText = inputElement.value;
    },
  }
}

</script>

<template>
  <tags :addTags="addTagToInvite"></tags>
  <input class="input-find" type="text" placeholder="Напишіть інвайт" v-model="inviteText" ref="inviteInput"/>
  <base-button @click="addInvite">Додати</base-button>
  <div class="form-control-find">
    <select class="input-find-select" v-model="inviteType">
      <option v-for="option in inviteOptions" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>

.input-find {
  width: 70%;
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5px;
}

.form-control-find {
  margin: 0.5rem 0;
}

.input-find-select {
    width: 70%;
    padding: 5px;
    font-size: 12px;
    margin-left: 5px;
    border-radius: 5px;
}
</style>

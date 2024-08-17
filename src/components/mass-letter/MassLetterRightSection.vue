<script>
import Log from "@/components/chat-page/chat-section/sending-section/log/Log.vue";
import {getMyMenFromServerMassLetter} from "@/functions/mass-letter/getMyMenFromServerMassLetter.js";
import {useTheme} from "vuetify";

export default {
  components: {Log},
  props: ['counter', 'errorCounter', 'ladyId', 'isSendingMassLetters', 'logsMass'],
  data() {
    return {
      theme: useTheme(),
      users: 0
    }
  },
  methods: {
    async getLengthUsers() {
      const myManSectionIdsMassLetter = await getMyMenFromServerMassLetter(this.ladyId);
      this.users = myManSectionIdsMassLetter.length;
    }
  },
  async mounted() {
    await this.getLengthUsers();
  }
}

</script>

<template>
  <div v-if="!isSendingMassLetters">
    <p>Готовий до масової розсилки!</p>
  </div>
  <div v-else>
    <p>Наліслано сьогодні: {{ counter }}/{{users}}, помилки: {{ errorCounter }}</p>
  </div>
  <div class="log-list-item-bottom"
       :style="{
              boxShadow: theme.global.name === 'dark'
              ? '2px 2px 10px rgba(255, 255, 255, 0.3)'
              : '0 2px 8px rgba(0, 0, 0, 0.26)',
            }"
  >
    <log :logs="logsMass"></log>
  </div>
</template>

<style scoped>
.log-list-item-bottom {
  margin: 10px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 10px;
  border-radius: 12px;
  height: 55%;
}
</style>

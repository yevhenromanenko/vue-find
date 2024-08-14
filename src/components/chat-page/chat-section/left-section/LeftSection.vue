<script>
import InvitePage from "@/components/invites/InvitePage.vue";
import LetterPage from "@/components/letters/LetterPage.vue";

export default {
  components: { InvitePage, LetterPage },
  data() {
    return {
      selectedTab: 'invite-page',
    }
  },
  computed: {
    invitesButtonMode() {
      return this.selectedTab === 'invite-page' ? null : 'flat';
    },
    lettersButtonMode() {
      return this.selectedTab === 'letter-page' ? null : 'flat';
    },
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
  }
}

</script>

<template>
  <base-button @click="setSelectedTab('invite-page')" :mode="invitesButtonMode">Інвайти</base-button>
  <base-button @click="setSelectedTab('letter-page')" :mode="lettersButtonMode">Листи</base-button>

  <keep-alive>
      <component :is="selectedTab"></component>
  </keep-alive>
</template>

<style scoped>

</style>

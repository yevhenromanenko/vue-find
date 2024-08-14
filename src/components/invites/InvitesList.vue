<script>
import InviteItem from "@/components/invites/InviteItem.vue";
import {loadInvites} from "@/functions/invites/loadInvites.js";

export default {
  components: { InviteItem },
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  computed: {
    invites() {
      return this.$store.getters['loadedInvites'];
    },
  },
  created() {
    this.loadInvites();
  },
  methods: {
    loadInvites,
  }
}
</script>

<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <div class="invite-container" v-if="!isLoading && invites.length > 0">
    <ul class="invite-list">
      <invite-item
          v-for="(invite, index) in invites"
          :key="invite.id"
          :index="index"
          :id="invite.id"
          :text="invite.text"
          :is-my-man="invite.isMyMan"
          :is-birthday="invite.isBirthday"
          :is-photo="invite.isPhoto"
          :is-no-photo="invite.isNoPhoto"
      >
      </invite-item>
    </ul>
  </div>
  <h3 class="no-invites" v-if="error">{{ error }}</h3>
  <h3 class="no-invites" v-if="!isLoading && invites.length === 0">Додайте хоча б один інвайт!</h3>
</template>

<style scoped>

.invite-container {
  max-width: 40rem;
  margin: auto;
  overflow-y: auto;
  max-height: 155px;
}


.invite-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.no-invites {
  margin: 10px;
}

</style>

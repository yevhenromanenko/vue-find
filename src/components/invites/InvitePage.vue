<script>
import InvitesAdd from "@/components/invites/invites-add/InvitesAdd.vue";
import InvitesList from "@/components/invites/InvitesList.vue";

export default {
  components: {InvitesList, InvitesAdd},
  inject: ["theme"]
}

</script>


<template>
  <div class="add-item-block-top">
    <InvitesAdd/>
  </div>

  <div
      class="list-item-bottom"
      :style="{
        boxShadow: theme.global.name === 'dark'
        ? '2px 2px 10px rgba(255, 255, 255, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.26)',
      }"
  >
    <invites-list></invites-list>
  </div>
</template>

<style scoped>
.add-item-block-top {
  margin: 10px auto;
}

.list-item-bottom {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 10px;
  border-radius: 12px;
  height: 50%;
}

</style>

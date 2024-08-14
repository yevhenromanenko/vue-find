<script>
import InvitesAdd from "@/components/invites/invites-add/InvitesAdd.vue";
import InvitesList from "@/components/invites/InvitesList.vue";

export default {
  components: {InvitesList, InvitesAdd},
}

</script>


<template>
  <div class="add-item-block-top">
    <InvitesAdd/>
  </div>

  <div class="list-item-bottom">
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

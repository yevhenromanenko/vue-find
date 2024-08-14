<script>
import LogItem from "@/components/chat-page/chat-section/sending-section/log/LogItem.vue";

export default {
  components: {LogItem},
  props: ['logs']
}
</script>

<template>
  <div class="log-container">
    <ul class="log-list">
      <log-item
          v-for="(log, index) in logs"
          :index="index"
          :manId="log.id"
          :manName="log.manName"
          :manLocation="log.manLocation"
          :profileLink="log.profileLink"
          :srcPhoto="log.srcPhoto"
          :text="log.text"
      >
      </log-item>
    </ul>
  </div>
</template>


<style scoped>
.log-container {
  max-width: 40rem;
  margin: auto;
  overflow-y: auto;
  max-height: 172px;
}

.log-list {
  list-style: none;
  padding: 0;
  margin: 0;
}


@media (max-width: 830px) {
  .log-container {
    height: 153px;
    max-height: 153px;
  }
}

</style>

<script>
export default {
  props: {
    manId: String,
    manName: String,
    manLocation: String,
    profileLink: String,
    srcPhoto: String,
    text: String,
  },
  inject: ["theme"]
}

</script>

<template>
  <li class="log-to-send-item">
    <div class="img-in-log">
      <img :src="srcPhoto" class="ava-in-log" alt="" />
    </div>
    <div class="msg-in-log">
      <div
          class="log-text"
          :style="{ color: theme.global.name === 'dark' ? '#ececf1' : '#2c3e50' }"
      >{{ text }}</div>
      <div
          class="invite-info-in-log"
          :style="{ color: theme.global.name === 'dark' ? '#ececf1' : '#2c3e50' }"
      >
        {{ manName }} -
        <a :href="profileLink" target="_blank" rel="noopener noreferrer" class="ded-id-in-log">{{ manId }}</a>
        <span class="country-in-log">{{ manLocation }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped>


.log-to-send-item {
  display: flex;
  align-items: center;
  padding: 2px 5px;
  margin: 2px;
  border: 1px solid #2c3e50;
  border-radius: 5px;
}

.msg-in-log {
  margin-left: 20px;
  padding: 2px;
  font-size: 12px;
  color: #2c3e50;
}

.log-text {
  flex-grow: 1;
  max-width: 45ch;
  overflow-wrap: break-word;
}

.img-in-log {
  margin-left: 5px;
}

.ava-in-log {
  width: 30px;
  height: 35px;
  border-radius: 10px;
  margin-left: 5px;
  margin-top: 5px;
}

.country-in-log {
  margin-left: 5px;
}

</style>

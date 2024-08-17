<script>
import {truncateContent} from "@/functions/notification/newChat/truncateContent.js";

export default {
  methods: {truncateContent},
  props: ['msgToArchive', 'removeMsgFromArchive'],
  inject: ['theme']
}

</script>

<template>
  <div v-if="msgToArchive.length > 0">
    <div
        class="id-user-ban-my-man"
        :style="{
                backgroundColor: theme.global.name === 'dark'
                ? '#2c3e50'
                : '#ececf1',
              }"
        v-for="(newChat, index) in msgToArchive" :key="index">
      <div class="invite-info-in-log">
        <a :href="`https://findbride.com/search/man_profile/all/${newChat.manId}`" target="_blank" rel="noopener noreferrer" class="ded-id-in-log">{{ newChat.manId }}:</a>
        <span :title="newChat.content">{{ truncateContent(newChat.content) }}</span> ({{ newChat.date }})
      </div>
      <button class="delete-user-btn" @click="removeMsgFromArchive(index)">x</button>
    </div>
  </div>

  <div v-else>
    <span>Чатів не знайдено!</span>
  </div>
</template>

<style scoped>
.id-user-ban-my-man {
  background-color: #ececf1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px;
  margin: 2px;
  border: 1px solid #2c3e50;
  border-radius: 5px;
}

.delete-user-btn {
  padding: 2px;
  font-family: inherit;
  margin: 0 3px;
  background-color: #444654;
  border: 1px solid #444654;
  color: #ececf1;
  cursor: pointer;
  border-radius: 5px;
}

.delete-user-btn:hover {
  background-color: #202123;
  border-color: #202123;
}

.invite-info-in-log span {
  cursor: pointer;
  border-bottom: 1px dashed #000;
}

.invite-info-in-log span:hover {
  color: #000;
}
</style>

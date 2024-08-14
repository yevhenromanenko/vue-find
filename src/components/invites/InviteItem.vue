<script>
export default {
  props: ['text', 'index', 'isMyMan', 'isBirthday', 'isPhoto', 'isNoPhoto'],
  methods: {
    removeInvite(index) {
      this.$store.dispatch('removeInvite', index);
    },
  }
}
</script>

<template>
  <li class="list-item">
    <span class="invite-text">{{ text }}</span>
    <span v-if="isMyMan" class="heart-logo">❤️</span>
    <span v-if="isBirthday" class="heart-logo">🎁</span>
    <span v-if="isPhoto" class="heart-logo">📸</span>
    <span v-if="isNoPhoto" class="heart-logo">👤</span>
    <button class="delete-button" @click="removeInvite(index)">Видалити</button>
  </li>
</template>

<style scoped>

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px;
  margin: 2px;
  border: 1px solid #2c3e50;
  border-radius: 5px;
}

.invite-text {
  flex-grow: 1;
  max-width: 45ch;
  overflow-wrap: break-word;
}

.delete-button {
  margin-left: 10px;
  padding: 6px 8px;
  background-color: #ececf1;
  color: #2c3e50;
  border: 1px solid #2c3e50;
}

.delete-button:hover{
  background-color: #2c3e50;
  border-color: #ececf1;
  color: #ececf1;
}

</style>


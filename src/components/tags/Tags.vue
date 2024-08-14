<script>

export default {
  name: "Tags",
  props: ['addTags'],
}
</script>

<template>
  <div class="tags-buttons">
    <button class="tag-button" @click="addTags('Name')">Ім'я</button>
    <button class="tag-button" @click="addTags('Country')">Країна</button>
    <button class="tag-button" @click="addTags('City')">Місто</button>
    <button class="tag-button" @click="addTags('Age')">Вік</button>
  </div>
</template>

<style scoped>
.tags-buttons {
  margin: 3px 0;
}

.tag-button {
  padding: 1%;
  font-size: 95%;
  font-family: inherit;
  margin: 0 3px;
  background-color: #444654;
  border: 1px solid #444654;
  color: #ececf1;
  cursor: pointer;
  border-radius: 5px;
}

.tag-button:hover {
  background-color: #202123;
  border-color: #202123;
}
</style>

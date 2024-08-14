<script>
export default {
  props: ['mode']
}
</script>

<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 3% 4%;
  font-size: 95%;
  font-family: inherit;
  margin-right: 5px;
  background-color: #444654;
  border: 1px solid #444654;
  color: #ececf1;
  cursor: pointer;
  border-radius: 5px;
}

button:hover,
button:active {
  background-color: #202123;
  border-color: #202123;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #edd2ff;
}

@media (max-width: 830px) {
  button {
    padding: 2% 3%
  }
}

</style>

<script>
import TextareaLetter from "@/components/letters/TextareaLetter.vue";
import SubjectLetter from "@/components/letters/SubjectLetter.vue";
import {loadBdayTemplate} from "@/functions/letters/loadBdayTemplate.js";
import {loadOnlineTemplate} from "@/functions/letters/loadOnlineTemplate.js";
import {saveTemplate} from "@/functions/letters/saveTemplate.js";
import {toggleForm} from "@/functions/letters/toggleForm.js";

export default {
  name: "TemplatesPage",
  components: {SubjectLetter, TextareaLetter},
  data() {
    return {
      showBdayForm: false,
      showOnlineForm: false,
      bdaySubject: {
        val: '',
        isValid: true
      },
      bdayLetter: {
        val: '',
        isValid: true
      },
      onlineSubject: {
        val: '',
        isValid: true
      },
      onlineLetter: {
        val: '',
        isValid: true
      },
      formIsValidBday: {
        val: true,
        isValid: true
      },
      formIsValidOnline: {
        val: true,
        isValid: true
      },
    }
  },
  computed: {
    ladyId() {
      return this.$store.getters.loadedLadyId;
    }
  },
  methods: {
    toggleForm,
    saveTemplate,
    loadBdayTemplate,
    loadOnlineTemplate
  },
  async mounted() {
    await this.loadBdayTemplate();
    await this.loadOnlineTemplate();
  }
}
</script>

<template>
  <div class="form-container-find">
    <div class="bottom-center">
      <base-button @click="toggleForm('bday')" :class="{'active-button': showBdayForm}" class="start-button">HBday шаблон</base-button>
      <base-button @click="toggleForm('online')" :class="{'active-button': showOnlineForm}" class="start-button">Чоловік онлайн</base-button>
    </div>

    <section class="section-letter"  v-if="showBdayForm || showOnlineForm">
      <div v-if="showBdayForm">
        <h3>Напишіть шаблон для чоловіків, у яких сьогодні день нарождення!</h3>
        <subject-letter
            :input="bdaySubject"
        ></subject-letter>

        <textarea-letter
            :input="bdayLetter"
        ></textarea-letter>
        <p v-if="!formIsValidBday">Будь ласка, виправте всі помилки вище!</p>
        <button @click="saveTemplate('bday')">Зберегти</button>
      </div>

      <div v-if="showOnlineForm">
        <h3>Напишіть шаблон для чоловіків, які онлайн зараз!</h3>

        <subject-letter
            :input="onlineSubject"
        ></subject-letter>

        <textarea-letter
            :input="onlineLetter"
        ></textarea-letter>
        <p v-if="!formIsValidOnline">Будь ласка, виправте всі помилки вище!</p>
        <button @click="saveTemplate('online')">Зберегти</button>
      </div>
    </section>

  </div>
</template>

<style scoped>

.form-container-find {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: white;
}

.section-letter {
  margin-top: 10px;
  margin-left: 26%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 50%;
  padding: 1rem;
  border-radius: 12px;
}

.bottom-center {
  position: fixed;
  top: 10%;
  left: 43%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.active-button {
  background-color: #004085;
  color: white;
}

@media (max-width: 670px) {
  .bottom-center {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 2%;
    left: 55%;
    transform: translateX(-50%);
    z-index: 999999;
  }

  .start-button {
    color: #444654;
    background-color: #ececf1;
    border: none;
    padding: 14px;
    font-size: 12px;
    border-radius: 6px;
    cursor: pointer;
    text-transform: uppercase;
  }

  .section-letter {
    margin-top: 15%;
  }
}

</style>

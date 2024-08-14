<script>
import getLetterFromServer from "@/functions/letters/getLetterFromServer.js";
import getManInfo from "@/functions/men/getManInfo.js";
import replaceTags from "@/functions/invites/replaceTags.js";
import {showValidationError} from "@/functions/notification/showValidationError.js";

export default {
  name: "TemplateSendToUser",
  computed: {
    ladyId() {
      return this.$store.getters.loadedLadyId;
    }
  },
  methods: {
    async insertTemplate(template) {
      let manId = null;
      const letter = document.querySelector('.editor-textarea #text2');
      const subject = document.querySelector('.message-subject');
      const profileIdElement = document.querySelector('.mb-login .profile-id');

      if (profileIdElement) {
        const text = profileIdElement.textContent.trim();
        const match = text.match(/ID (\d+)/);

        if (match && match[1]) {
          manId = parseInt(match[1]);
        }
      }

      if (letter && subject) {
        const data = await getLetterFromServer(this.ladyId, template);

        if (data) {
          const man = await getManInfo(manId)

          const subjectText = replaceTags(data.subject, man);
          const letterText = replaceTags(data.letter, man);

          subject.value = subjectText;
          letter.innerText = letterText;
        } else {
          showValidationError('Шаблон не знайдено, спочатку збережіть його на сторінці "Шаблони"')
        }
      } else {
        console.error('Error: Div not found');
      }
    }
  }
}
</script>

<template>
  <div class="bottom-center">
    <base-button @click="insertTemplate('template-bday')" class="start-button">Використати B-Day шаблон</base-button>
    <base-button @click="insertTemplate('template-online')" class="start-button">Використати Online шаблон</base-button>
  </div>
</template>

<style scoped>
.bottom-center {
  position: fixed;
  top: 10%;
  left: 66%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.start-button {
  font-size: 14px;
  padding: 1% 2%;
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
}
</style>

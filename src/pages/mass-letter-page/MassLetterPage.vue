<script>
import MassLetterLeftSection from "@/components/mass-letter/MassLetterLeftSection.vue";
import MassLetterRightSection from "@/components/mass-letter/MassLetterRightSection.vue";
import startSendMassLetter from "@/functions/mass-letter/startSendMassLetter.js";
import {stopSendingMassLetters} from "@/functions/mass-letter/stopSendingMassLetter.js";

export default {
  components: {MassLetterRightSection, MassLetterLeftSection},
  provide() {
    return {
      photosMass: this.photosMassLetter,
      videosMass: this.videosMassLetter,
    }
  },
  data() {
    return {
      massLetterCounter: 0,
      massLetterErrorCounter: 0,
      logsMassLetter: [],
      intervalIdMassLetters: null,
      isSendingMassLetters: false,
      subjectMassLetter: {
        val: '',
        isValid: true
      },
      letterMassLetter: {
        val: '',
        isValid: true
      },
      photoMassLetter: {
        val: null,
        isValid: true
      },
      videoMassLetter: {
        val: null,
        isValid: true
      },
      formIsValidMassLetter: {
        val: true,
        isValid: true
      },
      photosMassLetter: [],
      videosMassLetter: [],
      myManSectionIdsMassLetter: [],
    }
  },
  computed: {
    ladyId() {
      return this.$store.getters.loadedLadyId;
    }
  },
  methods: {
    stopSendingMassLetters,
    startSendMassLetter,
  },
}
</script>

<template>
  <div class="bottom-center">
    <div v-if="!isSendingMassLetters">
      <base-button @click="startSendMassLetter(this)" class="start-button">Почати</base-button>
    </div>
    <div v-else>
      <base-button @click="stopSendingMassLetters" class="stop-button">Зупинити розсилку</base-button>
    </div>
  </div>


  <div class="chat-app-find-mass-letter">
    <div class="container-find-mass-letter">
      <section class="left-section-mass-letter">
        <mass-letter-left-section
            :subjectMassLetter="subjectMassLetter"
            :letterMassLetter="letterMassLetter"
            :photoMassLetter="photoMassLetter"
            :videoMassLetter="videoMassLetter"
            :formIsValidMassLetter="formIsValidMassLetter"
            :photosMassLetter="photosMassLetter"
            :videosMassLetter="videosMassLetter"
        ></mass-letter-left-section>
      </section>

      <section class="right-section-mass-letter">
        <mass-letter-right-section
            :counter="massLetterCounter"
            :errorCounter="massLetterErrorCounter"
            :ladyId="ladyId"
            :isSendingMassLetters="isSendingMassLetters"
            :logsMass="logsMassLetter"
        >
        </mass-letter-right-section>
      </section>
    </div>
  </div>
</template>

<style scoped>
.chat-app-find-mass-letter {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: white;
}

.container-find-mass-letter {
  height: 600px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.left-section-mass-letter {
  margin: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 50%;
  padding: 1rem;
  border-radius: 12px;
}

.right-section-mass-letter {
  flex: 1;
  margin: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

.bottom-center {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
}

.start-button {
  padding: 25% 35%;
}

.stop-button {
  border: 1px solid #cfcfd1;
  background-color: #ff5c5c;
  color: white;
}

.stop-button:hover {
  color: #ff5c5c;
  background-color: #cfcfd1;
}

@media (max-width: 680px) {
  .bottom-center {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 2%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999999;
  }

  .start-button,
  .stop-button {
    color: #444654;
    background-color: #ececf1;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    text-transform: uppercase;
  }

  .stop-button {
    background-color: #ff5c5c;
    color: white;
  }

  .start-button:hover,
  .stop-button:hover {
    background-color: #cfcfd1;
  }
}

</style>

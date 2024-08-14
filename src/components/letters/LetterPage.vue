<script>

import {mapActions, mapMutations} from "vuex";
import {selectPhoto} from "@/functions/media/selectPhoto.js";
import {selectVideo} from "@/functions/media/selectVideo.js";
import {loadData} from "@/functions/letters/loadDataLetter.js";
import {validateForm} from "@/functions/letters/validateForm.js";
import {loadPhotos} from "@/functions/media/loadPhotos.js";
import {loadVideos} from "@/functions/media/loadVideos.js";
import {saveLetter} from "@/functions/letters/saveLetter.js";
import {togglePhotos} from "@/functions/media/togglePhotos.js";
import {toggleVideos} from "@/functions/media/toggleVideos.js";
import Tags from "@/components/tags/Tags.vue";
import {addTag} from "@/functions/tags/addTag.js";
import {addTagToSubject} from "@/functions/letters/addTagToSubject.js";
import {addTagToLetter} from "@/functions/letters/addTagToLetter.js";
import TextareaLetter from "@/components/letters/TextareaLetter.vue";
import SubjectLetter from "@/components/letters/SubjectLetter.vue";

export default {
  components: {SubjectLetter, TextareaLetter, Tags},
  data() {
    return {
      subject: {
        val: '',
        isValid: true
      },
      letter: {
        val: '',
        isValid: true
      },
      photo: {
        val: null,
        isValid: true
      },
      video: {
        val: null,
        isValid: true
      },
      formIsValid: {
        val: true,
        isValid: true
      },
      photos: [],
      videos: [],
      showPhotos: false,
      photoLoading: false,
      photoError: false,
      showVideos: false,
      videoLoading: false,
      videoError: false,
    }
  },
  computed: {
    ladyId() {
      return this.$store.getters.loadedLadyId;
    }
  },
  methods: {
    selectPhoto,
    selectVideo,
    loadData,
    ...mapMutations([
      'setSavedLetter',
    ]),
    ...mapActions([
      'saveLetterToServer',
    ]),
    validateForm,
    loadPhotos,
    loadVideos,
    saveLetter,
    togglePhotos,
    toggleVideos,
    addTagToSubject,
    addTagToLetter,
  },
  async mounted() {
    await this.loadPhotos();
    await this.loadVideos();
    await this.loadData()
  }
}
</script>

<template>
  <div class="form-container-find">
    <form @submit.prevent>

        <subject-letter
            :input="subject"
        ></subject-letter>

        <textarea-letter
            :input="letter"
        ></textarea-letter>

        <div class="form-control-find">
          <base-button @click="togglePhotos">
            {{ showPhotos ? 'Фото ⬆' : 'Фото ⬇' }}
          </base-button>
          <base-button @click="toggleVideos">
            {{ showVideos ? 'Відео ⬆' : 'Відео ⬇' }}
          </base-button>
        </div>

        <div class="form-control-find" :class="{invalid: !photo.isValid}">
          <div v-if="showPhotos">
            <base-spinner v-if="photoLoading"></base-spinner>
            <div v-if="photoError">Фото не знайдені</div>
            <div v-else>
              <a v-for="photo in photos" :key="photo.id">
                <img class="size-media" :src="photo.url" @click="selectPhoto(photo.id)" :class="{ selected: photo.id === this.photo.val }" alt="фото"/>
              </a>
            </div>
          </div>
        </div>

        <div class="form-control-find" :class="{ invalid: !video.isValid }">
          <div v-if="showVideos">
            <div v-if="videoLoading"><base-spinner></base-spinner></div>
            <div v-if="videoError">Відео не знайдені</div>
            <div v-else>
              <span v-for="video in videos" :key="video.id">
                <img class="size-media" :src="video.url" alt="фото" @click="selectVideo(video.id)" :class="{ selected: video.id === this.video.val }"/>
              </span>
            </div>
          </div>
        </div>

        <p v-if="!formIsValid">Будь ласка, виправте всі помилки вище!</p>
        <base-button @click="saveLetter">Зберегти</base-button>
      </form>
  </div>
</template>

<style scoped>
.form-container-find {
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
}

.form-control-find {
  margin: 5px 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.input-letter[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

.input-letter {
  display: block;
  width: 98%;
  height: 20px;
  border: 1px solid #ccc;
  font: inherit;
}

.textarea-letter {
  display: block;
  width: 98%;
  height: 170px;
  border: 1px solid #ccc;
  font: inherit;
}

.input-letter:focus,
.textarea-letter:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

.input-letter[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

.input-letter[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.size-media {
  width: 60px;
  height: 60px;
  border-radius: 3px;
  margin-left: 3px;
}

.letters-enter-from,
.letters-leave-to {
  opacity: 0;
  transform: scale(0.8)
}

.letters-enter-active {
  transition: all 0.3s ease-out;
}

.letters-leave-active {
  transition: all 0.3s ease-in;
}

.letters-enter-to,
.letters-leave-from {
  opacity: 1;
  transform: scale(1)
}

.selected {
  border: 3px solid red;
}

</style>

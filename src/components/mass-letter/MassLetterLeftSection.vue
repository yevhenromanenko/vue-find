<script>
import Tags from "@/components/tags/Tags.vue";
import {addTagToMassLetter} from "@/functions/mass-letter/addTagToMassLetter.js";
import {toggleVideosMassLetter} from "@/functions/mass-letter/toggleVideosMassLetter.js";
import {togglePhotosMassLetter} from "@/functions/mass-letter/togglePhotosMassLetter.js";
import {loadPhotosMassLetter} from "@/functions/mass-letter/loadPhotosMassLetter.js";
import {loadVideosMassLetter} from "@/functions/mass-letter/loadVideosMassLetter.js";
import {selectPhotoMassLetter} from "@/functions/mass-letter/selectPhotoMassLetter.js";
import {selectVideoMassLetter} from "@/functions/mass-letter/selectVideoMassLetter.js";
import SubjectLetter from "@/components/letters/SubjectLetter.vue";
import TextareaLetter from "@/components/letters/TextareaLetter.vue";

export default {
  props: ['subjectMassLetter', 'letterMassLetter', 'photoMassLetter', 'videoMassLetter', 'formIsValidMassLetter', 'photosMassLetter', 'videosMassLetter'],
  components: {TextareaLetter, SubjectLetter, Tags},
  inject: ['photosMass', 'videosMass', 'massLetterCounter'],
  data() {
    return {
      showPhotosMassLetter: false,
      photoLoadingMassLetter: false,
      photoErrorMassLetter: false,
      showVideosMassLetter: false,
      videoLoadingMassLetter: false,
      videoErrorMassLetter: false,
    }
  },
  methods: {
    selectVideoMassLetter,
    selectPhotoMassLetter,
    loadVideosMassLetter,
    loadPhotosMassLetter,
    togglePhotosMassLetter,
    addTagToMassLetter,
    toggleVideosMassLetter,
  }
}
</script>

<template>
  <div class="form-container-find">
    <form @submit.prevent>
      <subject-letter
          :input="subjectMassLetter"
      ></subject-letter>

      <textarea-letter
          :input="letterMassLetter"
      ></textarea-letter>

      <div class="form-control-find">
        <base-button class="show-photo-video" @click="togglePhotosMassLetter">
          {{ showPhotosMassLetter ? 'Фото ⬆' : 'Фото ⬇' }}
        </base-button>
        <base-button class="show-photo-video" @click="toggleVideosMassLetter">
          {{ showVideosMassLetter ? 'Відео ⬆' : 'Відео ⬇' }}
        </base-button>
      </div>

      <div class="form-control-find" :class="{invalid: !photoMassLetter.isValid}">
        <div v-if="showPhotosMassLetter">
          <base-spinner v-if="photoLoadingMassLetter"></base-spinner>
          <div v-if="photoErrorMassLetter">Фото не знайдені</div>
          <div v-else>
            <a v-for="photo in photosMass" :key="photo.id">
              <img class="size-media" :src="photo.url" @click="selectPhotoMassLetter(photo.id)" :class="{ selected: photo.id === this.photoMassLetter.val }" alt="фото"/>
            </a>
          </div>
        </div>
      </div>

      <div class="form-control-find" :class="{ invalid: !videoMassLetter.isValid }">
        <div v-if="showVideosMassLetter">
          <div v-if="videoLoadingMassLetter"><base-spinner></base-spinner></div>
          <div v-if="videoErrorMassLetter">Відео не знайдені</div>
          <div v-else>
              <span v-for="video in videosMass" :key="video.id">
                <img class="size-media" :src="video.url" alt="фото" @click="selectVideoMassLetter(video.id)" :class="{ selected: video.id === this.videoMassLetter.val }"/>
              </span>
          </div>
        </div>
      </div>

      <p v-if="!formIsValidMassLetter">Будь ласка, виправте всі помилки вище!</p>
    </form>
  </div>
</template>

<style scoped>
.form-container-find {
  max-height: 520px;
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

.selected {
  border: 3px solid red;
}

.show-photo-video {
  padding: 2% 3%;
}

@media (max-width: 680px) {
  .show-photo-video {
    padding: 2%;
    font-size: 90%;
  }
}
</style>

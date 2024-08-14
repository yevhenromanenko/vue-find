<script>
import TheHeader from "@/components/layout/header/TheHeader.vue";
import UseUserToken from "@/functions/token/useUserToken.js";
import getUserToken from "@/functions/token/getLadyIdFromCookies.js";
import refreshPage from "@/functions/etc/refreshPage.js";
import axios from "axios";
import getUserIdFromMainPage from "@/functions/token/getUserIdFromMainPage.js";
export default {
  components: {TheHeader},
  data() {
    return {
      showSavedProfiles: false,
      savedProfiles: [
        { login: 'Elizaveta_Date', password: 'ELIZAVETYA19date' },
        { login: 'Elizaveta_Date', password: 'ELIZAVETYA19date' }
      ],
    };
  },
  computed: {
    ladyId() {
      return this.$store.getters.loadedLadyId;
    }
  },
  methods: {
    toggleSavedProfiles() {
      this.showSavedProfiles = !this.showSavedProfiles;
    },
    async getLadyId() {
      try {
        const token = UseUserToken();
        const ladyId = getUserToken();
        const id = await getUserIdFromMainPage()

        const user_id = token.userToken ? token.userToken.siteId : ladyId;

        if (user_id) {
          this.$store.dispatch('updateLadyId', user_id);
          return user_id;
        }
        if (!user_id && id) {
          this.$store.dispatch('updateLadyId', id);
          return id;
        }

      } catch (error) {
        console.error('Error fetching ladyId:', error);
      }
    },
    async loginWithSavedProfile(login, password) {
      try {
        const response = await axios.post('https://findbride.com/girl/', `form%5Bvalue1%5D=${login}&form%5Bvalue2%5D=${password}&ok=%D0%9E%D1%82%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D1%82%D1%8C`, {
          headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'priority': 'u=0, i',
            'upgrade-insecure-requests': '1'
          },
          referrer: 'https://findbride.com/girl/',
          referrerPolicy: 'no-referrer-when-downgrade',
          withCredentials: true
        });
        if (response.status === 200) {
          refreshPage()
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    navigateToTranslator() {
      window.location.href = 'https://findbride.com/girl/';
    },
    navigateToAdmin() {
      window.location.href = 'https://findbride.com/partners/';
    },
  },
  async mounted() {
    await this.getLadyId()
  },
}
</script>

<template>
  <div v-if="ladyId">
    <TheHeader />
    <div class="app-find">
      <router-view />
    </div>
  </div>
  <div v-else>
    <div class="no-login">
      <span>
        ID було не знайдено! Будь-ласка введіть логін на пароль
      </span>
      <div class="btn-container">
        <div class="dropdown">
          <button @click="toggleSavedProfiles">Збережені профайли</button>
          <div v-if="showSavedProfiles" class="saved-profiles">
            <ul>
              <li v-for="profile in savedProfiles" :key="profile.login">
                <div class="lady-profile">
                  <button @click="loginWithSavedProfile(profile.login, profile.password)">
                    {{ profile.login }}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button @click="navigateToTranslator">Вхід перекладача</button>
        <button @click="navigateToAdmin">Вхід адміна</button>
      </div>
    </div>
  </div>
</template>

<style>

.btn-container {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

button {
  background-color: #444654;
  color: white;
  border: 1px solid #ececf1;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #202123;
}

.no-login {
  padding: 10px 15px;
  color: #444654;
  border: 1px solid #444654;
}

.lady-profile {
  padding: 2px 20px;
  margin-top: 1px;
}

.dropdown {
  position: relative;
}

.saved-profiles {
  position: absolute;
  margin-top: 10px;
  top: 40px;
  left: 0;
  background-color: white;
  border: 1px solid #ececf1;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: max-content;
}

.saved-profiles ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.saved-profiles li {
  margin: 0;
}

.saved-profiles li button {
  width: 100%;
  text-align: left;
  padding: 10px;
  background-color: #444654;
  color: white;
  border: 1px solid #ececf1;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.saved-profiles li button:hover {
  background-color: #202123;
}
</style>

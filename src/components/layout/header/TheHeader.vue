<script>
import {getUnreadCount} from "@/functions/letters/getUnreadCount.js";
import {newChat} from "@/functions/notification/newChat/newChat.js";
import refreshPage from "@/functions/etc/refreshPage.js";
import {clickToExit} from "@/functions/header/clickToExit.js";
import {getProfileData} from "@/functions/header/getProfileData.js";

export default {
  name: 'TheHeader',
  data() {
    return {
      ladyPhoto: null,
      ladyName: null,
      unreadCount: null,
      msgData: null,
      msgLength: 0,
      isMenuOpen: false
    }
  },
  methods: {
    refreshPage,
    getProfileData,
    clickToExit,
    newChat,
    getUnreadCount,
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  },
  async mounted() {
    await this.getProfileData();
    await this.getUnreadCount();
    await this.newChat('сработала функция из Header');
  }
};
</script>

<template>
  <header class="header-find">
    <div v-if="ladyPhoto && ladyName" class="logo-header">
      <img :src="ladyPhoto" alt="Lady Photo" class="lady-photo">
      <span class="text-lady-name">{{ ladyName }}</span>
    </div>
    <div v-else class="logo-header">Find Bride</div>

    <button class="menu-toggle" @click="toggleMenu">
      <span :class="{ 'menu-bar': true, 'menu-bar-rotate1': isMenuOpen }"></span>
      <span :class="{ 'menu-bar': true, 'menu-bar-hide': isMenuOpen }"></span>
      <span :class="{ 'menu-bar': true, 'menu-bar-rotate2': isMenuOpen }"></span>
    </button>

    <nav class="nav-header-find" :class="{ open: isMenuOpen }">
      <router-link to="/" class="custom-link-find" @click="refreshPage('/')">Головна</router-link>
      <router-link to="/chat" class="custom-link-find" @click="refreshPage('/chat')">
        Чат
        <span v-if="msgLength" class="unread-count">{{ msgLength }}</span>
      </router-link>
      <router-link to="/templates" class="custom-link-find" target='_blank'>Шаблони</router-link>
      <router-link to="/mass-letter" class="custom-link-find" target="_blank">Масова розсилка</router-link>
      <router-link to="/mess" class="custom-link-find" target='_blank'>
        Листи
        <span v-if="unreadCount" class="unread-count">{{ unreadCount }}</span>
      </router-link>
      <router-link to="/" class="custom-link-find" @click="clickToExit">Вихід</router-link>
    </nav>
  </header>
</template>

<style>
.header-find {
  background-color: #444654;
  color: #ececf1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-header {
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 40px;
}

.nav-header-find {
  display: flex;
  gap: 20px;
}

.custom-link-find {
  text-decoration: none;
  color: #ececf1;
  font-weight: bold;
  margin-right: 15px;
}

.custom-link-find:hover {
  text-decoration: underline;
}

.lady-photo {
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
}

.text-lady-name {
  font-size: 16px;
  margin: 0;
  text-align: center;
  align-self: center;
}

.unread-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 14px;
  margin-left: 5px;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

.menu-bar {
  width: 30px;
  height: 3px;
  background-color: #ececf1;
  transition: all 0.3s ease;
}

.menu-bar-rotate1 {
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
}

.menu-bar-hide {
  opacity: 0;
}

.menu-bar-rotate2 {
  transform: rotate(-45deg);
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
}

.nav-header-find.open {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
}
@media (max-width: 460px) {
  .text-lady-name {
    display: none;
  }
}

@media (max-width: 680px) {
  .nav-header-find {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: #444654;
    position: fixed;
    top: 60px;
    left: 0;
    padding: 10px 0;
    z-index: 1000;
  }

  .menu-toggle {
    display: flex;
  }

  .menu-bar-rotate1,
  .menu-bar-rotate2 {
    left: 0;
    top: 0;
    transform: translate(0, 14px) rotate(45deg);
  }

  .menu-bar-rotate2 {
    transform: translate(0, 14px) rotate(-45deg);
  }
}
</style>

<script>
import {getUnreadCount} from "@/functions/letters/getUnreadCount.js";
import {newChat} from "@/functions/notification/newChat/newChat.js";
import refreshPage from "@/functions/etc/refreshPage.js";
import {clickToExit} from "@/functions/header/clickToExit.js";
import {getProfileData} from "@/functions/header/getProfileData.js";
import {useTheme} from "vuetify";

export default {
  name: 'TheHeader',
  data() {
    return {
      ladyPhoto: null,
      ladyName: null,
      unreadCount: null,
      msgData: null,
      msgLength: 0,
      isMenuOpen: false,
      theme: useTheme(),
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
    },
    toggleTheme() {
      this.theme.global.name = this.theme.global.name === 'light' ? 'dark' : 'light'
    },
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
      <div class="dark-light">
        <label id="switch" class="switch">
          <input type="checkbox" @click="toggleTheme" id="slider">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
    <div v-else class="logo-header">
      <h2>Find Bride</h2>
      <div class="dark-light">
        <label id="switch" class="switch">
          <input type="checkbox" @click="toggleTheme" id="slider">
          <span class="slider round"></span>
        </label>
      </div>
    </div>

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
  background-color: #3a3b49;
  color: #f4f4f9;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  margin: 0;
}

.logo-header {
  font-size: 26px;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 40px;
}

.dark-light {
  margin-left: 20px;
}

.nav-header-find {
  display: flex;
  gap: 25px;
}

.custom-link-find {
  text-decoration: none;
  color: #f4f4f9;
  font-weight: bold;
  margin-right: 20px;
  font-size: 18px;
  transition: color 0.3s ease;
}

.custom-link-find:hover {
  color: #f39c12;
}

.lady-photo {
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.text-lady-name {
  font-size: 18px;
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
  margin-left: 8px;
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
  background-color: #f4f4f9;
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
  gap: 15px;
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
    background-color: #3a3b49;
    position: fixed;
    top: 60px;
    left: 0;
    padding: 10px 0;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: background-color 0.3s ease;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 2px;
  bottom: 1px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  background: white url('https://i.ibb.co/7JfqXxB/sunny.png') no-repeat center;
}

input:checked + .slider {
  background-color: #202123;
}

input:focus + .slider {
  box-shadow: 0 0 1px #202123;
}

input:checked + .slider:before {
  transform: translateX(22px);
  background: white url('https://i.ibb.co/FxzBYR9/night.png') no-repeat center;
}
</style>

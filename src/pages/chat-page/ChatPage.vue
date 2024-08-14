<script>
import LeftSection from "@/components/chat-page/chat-section/left-section/LeftSection.vue";
import SendingSection from "@/components/chat-page/chat-section/sending-section/SendingSection.vue";
import UseFindJWTRefreshToken from "@/functions/token/useFindJwtToken.js";
import generateJWTWithCurrentTime from "@/functions/token/fetchJWTFromCookie.js";
import {sendLettersWithInterval} from "@/functions/letters/sendLettersWithInterval.js";
import {getOnlineUsers} from "@/functions/men/getOnlineUsers.js";
import {toggleChatMode} from "@/functions/notification/toggleChatMode.js";
import {startSendingLetters} from "@/functions/letters/startSendingLetters.js";
import {stopSendingLetters} from "@/functions/letters/stopSendingLetters.js";
import {startSendingInvites} from "@/functions/invites/startSendingInvites.js";
import {stopSendingInvites} from "@/functions/invites/stopSendingInvites.js";
import {addBanId} from "@/functions/men/addBanId.js";
import {openProfile} from "@/functions/men/openProfile.js";
import {toggleShowBanIds} from "@/functions/men/toggleShowBanIds.js";
import {toggleShowMyManIds} from "@/functions/men/toggleShowMyManIds.js";
import {newChat} from "@/functions/notification/newChat/newChat.js";
import {showArchiveFunc} from "@/functions/notification/showArchiveFunc.js";
import {removeMsgFromArchive} from "@/functions/notification/newChat/removeMsgFromArchive.js";
import {startCheckingIncomingChat} from "@/functions/notification/newChat/startCheckingIncomingChat.js";
import {incomingChatWithInterval} from "@/functions/notification/newChat/incomingChatWithInterval.js";
import {sendInvitesWithInterval} from "@/functions/invites/sendInvitesWithInterval.js";
import {loadFromLocalStorage} from "@/functions/local-storage/loadFromLocalStorage.js";
import {getMyMenFromServer} from "@/functions/men/getMyMenFromServer.js";
import addMyManId from "@/functions/men/addMyManId.js";
import removeMyManId from "@/functions/men/removeMyManId.js";
import {truncateContent} from "@/functions/notification/newChat/truncateContent.js";
import MsgInArchive from "@/components/chat-page/chat-section/sending-section/MsgInArchive.vue";
import {fetchInviteCounter} from "@/functions/etc/fetchInviteCounter.js";
import {fetchLetterCounter} from "@/functions/etc/fetchLetterCounter.js";
import {setResetCountersIntervals} from "@/functions/etc/setResetCountersIntervals.js";
import updateCounterOnServer from "@/functions/etc/updateInviteCounterOnServer.js";
import {setResetCountersIntervalsLetter} from "@/functions/etc/setResetCountersIntervalsLetter.js";
import {toggleMyManOnlineInvites} from "@/functions/men/toggleMyManOnlineInvites.js";
import {toggleMyManOnlineLetters} from "@/functions/men/toggleMyManOnlineLetters.js";
import {getBanMenFromServer} from "@/functions/men/getBanMenFromServer.js";
import removeBanId from "@/functions/men/removeBanId.js";
import {startAutoStartTimer} from "@/functions/invites/startAutoStartTimer.js";
import {reloadPage} from "@/functions/etc/reloadPage.js";
import {bDayToday} from "@/functions/men/bDayToday.js";
import {bDayNotification} from "@/functions/notification/bDayNotification.js";
import {startCountdown} from "@/functions/notification/startCountdown.js";

export default {
  components: {MsgInArchive, SendingSection, LeftSection },
  provide() {
    return {
      usersOnline: this.usersOnline,
      invites: this.invites,
    }
  },
  data() {
    return {
      usersOnline: [],
      sentMessages: {
        noPhoto: [],
        birthday: [],
        hasPhoto: []
      },
      logsInvite: [],
      logsLetter: [],
      isSendingInvites: false,
      isSendingLetters: false,
      intervalId: null,
      intervalIdLetters: null,
      isChatMode: false,
      dailyInviteCounter: 0,
      dailyLetterCounter: 0,
      countInvitesForMyUsers: 0,
      countLettersForMyUsers: 0,
      errorInvite: 0,
      errorLetter: 0,
      banSectionIds: [],
      myManSectionIds: [],
      manyMessagesSent: [],
      newBanId: '',
      newMyManId: '',
      showBanIds: false,
      showMyManIds: false,
      showArchive: false,
      msgToArchive: [],
      msgLength: 0,
      intervalChat: null,
      isCheckChat: false,
      showMyManOnlineInvites: false,
      showMyManOnlineLetters: false,
      autoStartTimer: null,
      startChat: false,
      countdownText: "до оновлення сторінки 30:00 хв",
    }
  },
  computed: {
    invites() {
      return this.$store.getters.loadedInvites
    },
    ladyId() {
      return this.$store.getters.loadedLadyId
    },
    isBirthdaySoon() {
      return this.myManSectionIds.some(man => man.daysBefore <= 2);
    }
  },

  methods: {
    removeMyManId,
    addMyManId,
    truncateContent,
    toggleChatMode,
    startSendingLetters,
    stopSendingLetters,
    startSendingInvites,
    stopSendingInvites,
    sendLettersWithInterval,
    sendInvitesWithInterval,
    getOnlineUsers,
    openProfile,
    addBanId,
    removeBanId,
    toggleShowBanIds,
    toggleShowMyManIds,
    showArchiveFunc,
    removeMsgFromArchive,
    newChat,
    incomingChatWithInterval,
    startCheckingIncomingChat,
    getMyMenFromServer,
    getBanMenFromServer,
    fetchInviteCounter,
    fetchLetterCounter,
    setResetCountersIntervals,
    setResetCountersIntervalsLetter,
    toggleMyManOnlineInvites,
    toggleMyManOnlineLetters,
    startAutoStartTimer,
    reloadPage,
    bDayToday,
    bDayNotification,
    startCountdown,
  },
  watch: {
    dailyInviteCounter(newValue) {
       updateCounterOnServer(this.ladyId, newValue, 'counter', 'dailyInvite');
    },
    dailyLetterCounter(newValue) {
      updateCounterOnServer(this.ladyId, newValue, 'letter-counter', 'dailyLetter');
    },
  },
  async mounted() {
    const JWTRefreshToken = UseFindJWTRefreshToken();
    if (!JWTRefreshToken.JWTRefreshToken) {
      JWTRefreshToken.updateJWTRefreshToken();
    }

    await this.getOnlineUsers();
    setInterval(async () => {
      await generateJWTWithCurrentTime();
    }, 60000);

    setInterval( () => {
      this.getOnlineUsers();
    }, 30000);

    this.msgToArchive = loadFromLocalStorage('msgToArchive') || [];
    await this.newChat('сработала функция из ChatPage');
    await this.startCheckingIncomingChat();
    await this.getMyMenFromServer();
    await this.getBanMenFromServer();
    await this.fetchInviteCounter();
    await this.fetchLetterCounter();
    this.setResetCountersIntervals();
    this.setResetCountersIntervalsLetter();
    this.startAutoStartTimer();
    await this.bDayToday();
    setTimeout(await this.bDayNotification, 5000);

    setTimeout(this.reloadPage, 1800000);
    this.startCountdown();
  }
}
</script>

<template>
  <div v-if="!isChatMode" class="chat-app-find">
    <div class="container-find">
      <section class="left-section-find">
        <left-section></left-section>
      </section>

      <section class="middle-section-find">
        <sending-section
            :isSending="isSendingLetters"
            :textH3="'Розсилка листів зупинена!'"
            :usersOnline="usersOnline"
            :startSending="startSendingLetters"
            :stopSending="stopSendingLetters"
            :counter="dailyLetterCounter"
            :errors="errorLetter"
            :logs="logsLetter"
            :countForMyUsers="countLettersForMyUsers"
            :myManSectionIds="myManSectionIds"
            :showMyManOnline="showMyManOnlineLetters"
            :toggleMyManOnline="toggleMyManOnlineLetters"
        ></sending-section>
      </section>

      <section class="right-section-find">
        <sending-section
            :isSending="isSendingInvites"
            :textH3="'Розсилка інвайтів зупинена!'"
            :usersOnline="usersOnline"
            :startSending="startSendingInvites"
            :stopSending="stopSendingInvites"
            :counter="dailyInviteCounter"
            :errors="errorInvite"
            :logs="logsInvite"
            :countForMyUsers="countInvitesForMyUsers"
            :myManSectionIds="myManSectionIds"
            :showMyManOnline="showMyManOnlineInvites"
            :toggleMyManOnline="toggleMyManOnlineInvites"
        ></sending-section>
      </section>

      <section class="bottom-center">
        <div v-if="showArchive" class="id-list">
          <msg-in-archive
              :msgToArchive="msgToArchive"
              :removeMsgFromArchive="removeMsgFromArchive"
          ></msg-in-archive>
        </div>
        <div class="button-container" v-if="!showMyManOnlineLetters">
          <base-button class="middle-btn" @click="toggleChatMode">
            Перейти в чат
            <span v-if="msgLength" class="unread-count">{{ msgLength }}</span>
          </base-button>

          <base-button class="middle-btn-archive" @click="showArchiveFunc">
            {{ showArchive ? 'Архів чатів ⬇' : 'Архів чатів ⬆' }}
          </base-button>
        </div>
      </section>

      <section class="right-bottom-center" v-if="!showMyManOnlineInvites">
        <div class="countdown-text">{{ countdownText }}</div>
      </section>
    </div>

    <section class="input-section">
      <div :class="['left-section-my-man', { 'green-border': isBirthdaySoon }]">
        <input class="input-find-my-man" v-model.trim="newMyManId" placeholder="Напишіть ID постояльця">
        <base-button style="padding: 2% 3%" @click="() => {
          addMyManId(myManSectionIds, newMyManId)
          this.newMyManId = ''
        }">
          Додати
        </base-button>
        <base-button style="padding: 1.6% 3%" @click="toggleShowMyManIds">
          {{ showMyManIds ? 'Сховати ⬆' : 'Постояльці ⬇' }}
        </base-button>

        <div v-if="showMyManIds" class="id-list">
          <div v-if="myManSectionIds.length > 0">
            <div class="id-user-ban-my-man" v-for="(man, index) in myManSectionIds" :key="index">
              <div class="img-in-log">
                <img :src="man.srcPhoto" class="ava-in-log" alt="" />
              </div>
              <div class="invite-info-in-log">
                {{ man.manName }} -
                <a :href="man.profileLink" target="_blank" rel="noopener noreferrer" class="ded-id-in-log">{{ man.manId }}</a>
                <span class="country-in-log">{{ man.manLocation }}</span>
              </div>
              <div class="btn-container">
                <button class="b-day-user-btn" @click="openProfile(man.manId)">{{man.daysBefore}} днів до ДР</button>
                <button class="delete-user-btn" @click="removeMyManId(myManSectionIds, man.manId, index)">x</button>
              </div>
            </div>
          </div>
          <div v-else>
            <span style="color: #ececf1">Поки нема доданих ID!</span>
          </div>
        </div>

      </div>

      <div class="right-section-my-man">
        <base-button style="padding: 1.6% 3%" @click="toggleShowBanIds">
          {{ showBanIds ? 'Сховати ⬆' : 'Бан лист ⬇' }}
        </base-button>
        <base-button style="padding: 2% 3%" @click="addBanId">Додати</base-button>
        <input class="input-find-my-man" v-model.trim="newBanId" placeholder="ID користувача для блокування">

        <div v-if="showBanIds" class="id-list">
          <div v-if="banSectionIds.length > 0">
            <div class="id-user-ban-my-man" v-for="(man, index) in banSectionIds" :key="index">
              <div class="img-in-log">
                <img :src="man.srcPhoto" class="ava-in-log" alt="" />
              </div>
              <div class="invite-info-in-log">
                {{ man.manName }} -
                <a :href="man.profileLink" target="_blank" rel="noopener noreferrer" class="ded-id-in-log">{{ man.manId }}</a>
                <span class="country-in-log">{{ man.manLocation }}</span>
              </div>
              <div class="btn-container">
                <button class="b-day-user-btn" @click="openProfile(man.manId)">{{man.daysBefore}} днів до ДР</button>
                <button class="delete-user-btn" @click="removeBanId(banSectionIds, man.manId, index)">x</button>
              </div>
            </div>
          </div>
          <div v-else>
            <span style="color: #ececf1">Поки нема доданих ID!</span>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else>
    <base-button class="open-app" @click="toggleChatMode">Перейти в програму</base-button>
  </div>
</template>

<style scoped>
.chat-app-find {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: white;
}

.container-find {
  height: 430px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.input-section {
  height: 130px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.left-section-my-man {
  margin: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 50%;
  padding: 1rem;
  border-radius: 12px;
}

.right-section-my-man {
  margin: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 50%;
  padding: 1rem;
  border-radius: 12px;
}

.input-find-my-man {
  width: 60%;
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  margin: 5px;
  border-radius: 5px;
}

.middle-section-find,
.right-section-find {
  flex: 1;
  margin: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

.left-section-find {
  margin: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 33%;
  padding: 1rem;
  border-radius: 12px;
}

.open-app {
  position: absolute;
  padding: 1%;
  margin: 10px 0;
  left: 50%;
  transform: translateX(-50%);
}


.id-list {
  max-height: 160px;
  background-color: #ff5c5c;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
  overflow-y: auto;
}

.id-user-ban-my-man {
  display: flex;
  background-color: #ececf1;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px;
  margin: 2px;
  border: 1px solid #2c3e50;
  border-radius: 5px;
}


.ava-in-log {
  width: 20px;
  height: 20px;
}

.country-in-log {
  margin-left: 5px;
}

.unread-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 14px;
  margin-left: 5px;
}

.img-in-log {
  margin-right: 10px;
}

.invite-info-in-log {
  flex-grow: 1;
}

.btn-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.delete-user-btn {
  padding: 2px;
  font-family: inherit;
  margin: 0 3px;
  background-color: #444654;
  border: 1px solid #444654;
  color: #ececf1;
  cursor: pointer;
  border-radius: 5px;
}

.delete-user-btn:hover {
  background-color: #202123;
  border-color: #202123;
}

.b-day-user-btn {
  padding: 2px;
  font-family: inherit;
  margin: 0 3px;
  background-color: #444654;
  border: 1px solid #444654;
  color: #ececf1;
  cursor: pointer;
  border-radius: 5px;
}

.b-day-user-btn:hover {
  background-color: #202123;
  border-color: #202123;
}

.bottom-center {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.right-bottom-center {
  position: absolute;
  bottom: 30px;
  left: 81%;
  transform: translateX(-81%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

@media (max-width: 830px) {
  .chat-app-find {
    position: fixed;
    height: 92%;
    width: 100%;
    background-color: white;
    overflow-y: auto;
  }

  .unread-count {
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 3px 5px;
    font-size: 10px;
    margin-left: 5px;
  }

  .bottom-center {
    padding: 1.5% !important;
    position: fixed;
    bottom: 80%;
    background-color: #ff5c5c;
  }

  .middle-btn-archive {
    display: none;
  }

  .right-bottom-center {
    display: none;
  }

  .middle-btn {
    font-size: 80%;
    margin: 0;
  }

  .container-find, .input-section {
    padding: 2%;
    flex-direction: column;
    height: auto;
  }

  .left-section-find, .middle-section-find, .right-section-find {
    width: 100%;
    margin: 0;
    box-shadow: none;
    padding: 0;
  }

  .left-section-my-man {
    margin: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    width: 100%; /* Изменено для мобильных устройств */
    padding: 1rem;
    border-radius: 12px;
    overflow-y: auto; /* Добавлено для прокрутки содержимого */
  }

  .right-section-my-man {
    margin: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    width: 100%; /* Изменено для мобильных устройств */
    padding: 1rem;
    border-radius: 12px;
    overflow-y: auto; /* Добавлено для прокрутки содержимого */
  }

  .container-find section, .input-section > div {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    border-radius: 12px;
    margin: 5px 0;
  }

  .button-container {
    flex-direction: column;
  }

  .input-find-my-man {
    width: 30%;
    font-size: 85%;
    padding: 2% 3%;
  }

  .b-day-user-btn {
    display: none;
  }
}

</style>


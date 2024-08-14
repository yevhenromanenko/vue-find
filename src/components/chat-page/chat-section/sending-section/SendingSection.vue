<script>
import Log from "@/components/chat-page/chat-section/sending-section/log/Log.vue";

export default {
  components: { Log },
  props: ['isSending', 'textH3', 'usersOnline', 'startSending', 'stopSending', 'counter', 'errors', 'logs', 'countForMyUsers', 'myManSectionIds', 'showMyManOnline', 'toggleMyManOnline'],
  data() {
    return {
      myManOnline: [],
    };
  },
  methods: {
    getMyMenOnline() {
      this.myManOnline = this.myManSectionIds.filter(man => this.usersOnline.includes(man.manId));
    },
  },
  mounted() {
    setTimeout(() => {
      this.getMyMenOnline();
    }, 500);
  }
}

</script>

<template>
  <div v-if="!isSending">
    <h3>{{textH3}}</h3>
    <base-button @click="startSending">Почати розсилку</base-button>
  </div>
  <div v-else>
    <h3>
      Онлайн: {{ usersOnline && usersOnline.length > 0 ? usersOnline.length : '0' }} чоловіків,
      постояльці:
      <button class="man-online" @click="toggleMyManOnline">
        {{ myManOnline && myManOnline.length > 0 ? myManOnline.length : '0' }}
      </button>
    </h3>
    <base-button @click="stopSending">Зупинити розсилку</base-button>
  </div>
  <div class="log-list-item-bottom">
    <log :logs="logs"></log>
  </div>
  <p>Наліслано сьогодні: {{ counter }}, постояльцям: {{ countForMyUsers }}, помилки: {{ errors }}</p>

  <div v-if="showMyManOnline">
    <div v-if="myManOnline.length > 0">
      <h4>Постояльці онлайн:</h4>
      <div class="id-list">
        <div class="id-user-ban-my-man" v-for="man in myManOnline" :key="man.manId">
          <div class="img-in-log">
            <img :src="man.srcPhoto" class="ava-in-log" alt="" />
          </div>
          <div class="invite-info-in-log">
            {{ man.manName }} -
            <a :href="man.profileLink" target="_blank" rel="noopener noreferrer" class="ded-id-in-log">{{ man.manId }}</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h4>Всі постояльці офлайн зараз!</h4>
    </div>
  </div>


</template>

<style scoped>
.img-in-log {
  margin-right: 10px;
}

.ava-in-log {
  width: 20px;
  height: 20px;
}

.id-list {
  max-height: 52px;
  background-color: #ff5c5c;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2%;
  border-radius: 12px;
  overflow-y: auto;
}

.invite-info-in-log span {
  cursor: pointer;
  border-bottom: 1px dashed #000;
}

.invite-info-in-log span:hover {
  color: #000;
}

.id-user-ban-my-man {
  background-color: #ececf1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2px 5px;
  margin: 2px;
  border: 1px solid #2c3e50;
  border-radius: 5px;
}

.log-list-item-bottom {
  margin: 10px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 10px;
  border-radius: 12px;
  height: 55%;
}

.man-online {
  color: black;
}

.man-online:hover {
  background-color: #2c3e50;
  color: #ececf1;
}

@media (max-width: 680px) {
  .log-list-item-bottom {
    height: 55%;
  }

}
</style>

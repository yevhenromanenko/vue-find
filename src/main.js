import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router.js";
import BaseButton from "@/UI/base-button/BaseButton.vue";
import store from "@/store/index.js";
import BaseSpinner from "@/UI/base-spinner/BaseSpinner.vue";

const bodyForRoot = document.querySelector('body');

// bodyForRoot.style.marginTop = '495px'

const div = document.createElement("div");
div.id = 'find';
div.className = 'find'

div.style.position = 'fixed';
div.style.top = '0';
div.style.left = '0';
div.style.width = '100%';
div.style.zIndex = '998';
div.style.backgroundColor = 'white'

bodyForRoot.prepend(div);

const app = createApp(App);

app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);

app.use(router);
app.use(store);

app.mount('#find');

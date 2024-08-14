import { createRouter, createWebHistory } from 'vue-router';
import ChatPage from "@/pages/chat-page/ChatPage.vue";
import MassLetterPage from "@/pages/mass-letter-page/MassLetterPage.vue";
import TemplatesPage from "@/pages/templates-page/TemplatesPage.vue";
import TemplateSendToUser from "@/pages/templates-page/TemplateSendToUser.vue";

const routes = [
    { path: '/chat', component: ChatPage, meta: { title: 'Чат' }  },
    { path: '/mass-letter', component: MassLetterPage, meta: { title: 'Масова розсилка' } },
    { path: '/templates', component: TemplatesPage, meta: { title: 'Шаблони' } },
    {
        path: '/mess/send/all/:id',
        component: TemplateSendToUser,
        props: (route) => ({ openedForm: route.query.opened_form })
    },
    {
        path: '/mess/show/all/:id',
        component: TemplateSendToUser,
        props: (route) => ({ openedForm: route.query.opened_form })
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = 'Find bride';
    }
    next();
});

export default router;

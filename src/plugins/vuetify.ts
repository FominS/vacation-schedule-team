import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from "vuetify/src/locale/ru";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "mdi"
    },
    lang: {
        locales: { ru },
        current: "ru"
    },
    theme: {
        themes: {
            light: {
                primary: "#0088b2"
            }
        }
    }
});

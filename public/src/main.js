import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import fontawesome from '@fortawesome/fontawesome'
import faSolid from '@fortawesome/fontawesome-free-solid'
import faRegular from '@fortawesome/fontawesome-free-regular'
import faBrands from '@fortawesome/fontawesome-free-brands'
window.moment = require('moment');

import Index from './components/Index'
import Comic from './components/Comic'
import Select from './components/Select'


Vue.use(VueRouter);
Vue.use(Vuex);

Vue.component('Select',Select);

const store = new Vuex.Store({
    state : {
        comicDetail : {
            title : 'MY HEXSCHOOL',
            Genres : 'Fusce/vehicula/dolor',
            Author : 'Namae Shiranai',
            Status : 'Ongoing',
            Rate : 4,
            pic : 'https://hexschool.github.io/THE_F2E_Design/week5-comic%20viewer/assets/comic%20cover.png',
            Summary : `<p>If your banker breaks, you snap; if your apothecary by mistake sends you poison in your pills, you die.</p>
                       <p>Therefore, I say, I saw that this situation of mine was the precise situation of every mortal
                       that has this Siamese connexion with a plurality of other mortals. </p>`,
        },
        chapters: [
            { title : 'The F2E Challenage Start!'},
            { title : 'Todo List is Going Crazy!'},
        ],
        switchDay: 'day',
        nowChapter: ''
    },
    getters: {
        setNowChapters:(state)=>(chapter)=> {
            state.nowChapter = chapter;
        }
    },
    mutations: {
        switchDayNight(state) {
            state.switchDay = state.switchDay == 'day' ? 'night' : 'day';
        },
    }
})

const router = new VueRouter({
    routes: [
        { path : '/' , component: Index },
        { path : '/comic' , component: Comic },
    ]
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

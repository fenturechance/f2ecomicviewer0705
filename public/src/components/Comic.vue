<template>
    <div class="comicGroup">
        <header>
            <div class="breadcrumb">
                <h2 class="comicTitle" @click="directToIndex">{{ comicDetail.title }}</h2>
                <div class="arrow">
                    <i class="fas fa-caret-right"></i>
                </div>
                <Select
                    :list="totlaChapterArr"
                    :now-select.sync="nowChapter"
                    text="Chapter"
                ></Select>
                <Select
                    :list="totlaPageArr"
                    :now-select.sync="nowPage"
                    text="Page"
                ></Select>
            </div>
            <div class="dayAndNight" :class="$store.state.switchDay" @click="$store.commit('switchDayNight')">
                <i class="far fa-sun" ></i>
                <div class="switchGroup">
                    <div class="switcher"></div>
                </div>
                <i class="fas fa-moon"></i>
            </div>
        </header>
        <main>
            <div class="comicContentGroup">
                <div class="controlWrapper left" @click="changePage('prev')">
                    <div class="control">
                        <i class="fas fa-angle-left"></i>
                    </div>
                </div>
                <div class="comic">
                    <img :src="nowPageUrl">
                </div>
                <div class="controlWrapper right" @click="changePage('next')">
                    <div class="control">
                        <i class="fas fa-angle-right"></i>
                    </div>
                </div>
            </div>
            <div class="navigationGroup">
                <div class="tumbnailGroup">
                    <!-- <div class="previousChapter" :class="navigationControlStyle('previous')">
                        <i class="fas fa-angle-double-left"></i>
                    </div> -->
                    <ul>
                        <li v-for="page in nowPageArr" :class="navigationImgStyle(page)" @click="changeNavPage(page)">
                            <span class="pageIndex">{{ page }}</span>
                            <img :src="comicUrlGen(page)" alt="">
                        </li>
                    </ul>
                    <!-- <div class="nextChapter" :class="navigationControlStyle('next')">
                        <i class="fas fa-angle-double-right"></i>
                    </div> -->
                </div>
                <!-- <div class="scrollGroup">
                    <i class="fas fa-caret-left"></i>
                    <div class="scroll"></div>
                    <div class="end"></div>
                    <i class="fas fa-caret-right"></i>
                </div> -->
            </div>
        </main>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                nowChapter: this.$store.state.nowChapter,
                nowPage : 1,
                totalPage : 12,
                comicUrl : 'https://hexschool.github.io/THE_F2E_Design/week5-comic%20viewer/assets/storyboard-',
            }
        },
        watch: {
            nowChapter() {
                this.$store.getters.setNowChapters(this.nowChapter);
            }
        },
        computed: {
            ...mapState(['comicDetail','chapters']),
            nowPageUrl() {
                return `${this.comicUrl + this.nowPage}.png`
            },
            half() {
                return this.totalPage / 2;
            },
            lessThanHalf() {
                return this.nowPage <= this.half;
            },
            totlaPageArr() {
                let arr = [];
                for (let i = 1; i <= this.totalPage; i++) arr.push(i);
                return arr;
            },
            totlaChapterArr() {
                let totalChapter = this.chapters.length;
                let arr = [];
                for (let i = 1; i <= totalChapter; i++) arr.push(i);
                return arr;
            },
            nowPageArr() {
                let arr = [];
                if(this.lessThanHalf){
                    for (let i = 1; i <= this.half; i++) arr.push(i);
                }else{
                    for (let i = this.half + 1; i <= this.totalPage; i++) arr.push(i);
                }
                return arr;
            }
        },
        methods: {
            comicUrlGen(i){
                return `${this.comicUrl + i}.png`;
            },
            navigationControlStyle(prevOrNext){
                if(prevOrNext == 'previous'){
                    return this.nowChapter == 1 ? 'disable' : undefined;
                }else{
                    return this.nowChapter == 2 ? 'disable' : undefined;
                }
            },
            navigationImgStyle(i){
                let index = i;
                if(!this.lessThanHalf) index = index - this.half;
                if(i == this.nowPage) return 'now';
            },
            changePage(prevOrNext){
                if(this.nowPage == 1 && prevOrNext == 'prev') return;
                if(this.nowPage == this.totalPage && prevOrNext == 'next') return;
                if(prevOrNext == 'prev') this.nowPage -= 1;
                if(prevOrNext == 'next') this.nowPage += 1;
            },
            changeNavPage(page){
                this.nowPage = page;
            },
            directToIndex(){
                this.$router.push('/');
            },
        }
    }
</script>
<style lang="scss">
    @import '../assets/common';
    .comicGroup{
        header{
            display: flex;
            justify-content: space-between;
            .breadcrumb{
                display: flex;
                align-items: center;
                .comicTitle{
                    cursor: pointer;
                }
                .arrow{
                    margin: 0 10px;
                }
            }
            .dayAndNight{
                display: flex;
                align-items: center;
                cursor: pointer;
                &.day{
                    .switchGroup{
                        justify-content: flex-start;
                    }
                }
                &.night{
                    .switchGroup{
                        justify-content: flex-end;
                    }
                }
                .switchGroup{
                    width: 50px;
                    background-color: $b;
                    border: 2px solid $b;
                    margin: 0 5px;
                    display: flex;
                    align-items: center;
                    .switcher{
                        width: 23px;
                        height: 16px;
                        background-color: $gray;
                    }
                }
            }
        }
        main{
            margin: 20px 0 0 0;
            .comicContentGroup{
                position: relative;
                .controlWrapper{
                    height: 100%;
                    position: absolute;
                    top: 0;
                    cursor: pointer;
                    padding: 0 40px;
                    &:hover{
                        background-color: $b;
                        .control{
                            color: $g;
                        }
                    }
                    &.right{
                        right: 0;
                        transform: translateX(100%);
                    }
                    &.left{
                        transform: translateX(-100%);
                    }
                    .control{
                        position: absolute;
                        font-size: 40px;
                        top: 50%;
                        transform: translateY(-50%) translateX(-50%);
                        left: 50%;
                    }
                }
            }
            .navigationGroup{
                margin: 20px 0 0 0;
                .tumbnailGroup{
                    ul{
                        display: flex;
                        li{
                            margin: 0 10px;
                            text-align: center;
                            cursor: pointer;
                            &.now{
                                border: 5px solid $b;
                                position: relative;
                                &:before{
                                    content: '';
                                    position: absolute;
                                    width: 0;
                                    height: 0;
                                    border-left: 10px solid transparent;
                                    border-right: 10px solid transparent;
                                    border-bottom: 10px solid $b;
                                    left: 0;
                                    right: 0;
                                    margin: auto;
                                    transform: translateY(-150%);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>

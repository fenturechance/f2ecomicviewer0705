<template>
    <div class="indexGroup">
        <div class="bookGroup">
            <div class="picGroup">
                <img :src="comicDetail.pic" alt="">
            </div>
            <div class="infoGroup">
                <h2>{{ comicDetail.title }}</h2>
                <div class="detailGroup">
                    <div class="basicInfo">
                        <table>
                            <tr v-for="(detail,key) in comicDetail" v-if="!['title','Summary','pic','Rate'].includes(key)">
                                <th>{{ key }}</th>
                                <td>{{ detail }}</td>
                            </tr>
                            <tr>
                                <th>Rate</th>
                                <td>
                                    <i class="fas fa-star" v-for="rate in comicDetail.Rate"></i>
                                    <i class="far fa-star" v-for="rate in 5 - comicDetail.Rate"></i>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="summaryGroup">
                        <h3>Summary</h3>
                        <article v-html="comicDetail.Summary"></article>
                    </div>
                </div>
            </div>
        </div>
        <div class="chaptersGroup">
            <h3>All Chapters</h3>
            <ul class="chapterGroup">
                <li v-for="(chapter,i) in chapters" class="bf" @click="directToComic(i)">
                    <span>Chapter {{ i +1 }} :</span>
                    <span>{{ chapter.title }}</span>
                    <span v-if="showNewLabel(chapters,i)" class="newLabel">NEW</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                }
        },
        computed: {
            ...mapState(['comicDetail','chapters'])
        },
        methods: {
            showNewLabel(arr, i) {
                return i == arr.length - 1;
            },
            directToComic(i) {
                let page = i + 1 ;
                this.$router.push('/comic');
                this.$store.getters.setNowChapters(page);
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/common';
    .indexGroup{
        &> .bookGroup{
            display: flex;
            &> .picGroup{
                flex: 4;
                border: $br;
                img{
                    width: 100%;
                }
            }
            &> .infoGroup{
                flex: 6;
                &> h2 {
                    padding: 10px;
                    background-color: $b;
                    color: $w;
                    font-size: 30px;
                    text-align: center;
                }
                &> .detailGroup{
                    padding: 10px 20px;
                    &> .basicInfo{
                        table{
                            width: 100%;
                            text-align: left;
                            td{
                                padding: 5px 0;
                            }
                        }
                    }
                    &> .summaryGroup{
                        margin: 20px 0 0 0;
                        h3{
                            font-size: 16px;
                        }
                        article{
                            line-height: 2;
                            p{
                                margin: 20px 0;
                            }
                        }
                    }
                }
            }

        }
        &> .chaptersGroup{
            margin: 20px 0 0 0;
            h3{
                display: inline-block;
                background-color: $b;
                color: $w;
                padding: 10px 20px;
            }
            .chapterGroup{
                padding: 20px;
                border: $br;
                li{
                    padding: 20px 10px;
                    cursor: pointer;
                    &:hover{
                        background-color: $b;
                        color: $w;
                        .newLabel{
                            color: $b;
                        }
                    }
                    .newLabel{
                        background-color: $g;
                        padding: 0 10px;
                        margin: 0 0 0 10px;
                    }
                }
            }
        }
    }
</style>

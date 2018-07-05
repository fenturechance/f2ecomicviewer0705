<template>
    <div class="selectWrapper">
        <div class="nowSelect" @click="show = !show">
            <span>{{ `${text} ${nowSelect}` }}</span>
            <span class="arrowGroup">
                <i class="fas fa-caret-up"></i>
                <i class="fas fa-caret-down"></i>
            </span>
        </div>
        <ul class="selectList" v-if="show">
            <li v-for="item in list" @click="selectItem(item)">{{ `${text} ${item}` }}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show : false
            }
        },
        props: ['list','nowSelect','text'],
        methods: {
            selectItem(i){
                this.$emit('update:nowSelect',i);
                this.show = false;
            }
        }
    }
</script>
<style lang="scss">
    @import '../assets/common';
    .nowSelect,.selectList{
        border: $br;
        border-width: 2px;
        font-weight: bold;
    }
    .selectWrapper{
        width: 150px;
        position: relative;
    }
    .nowSelect{
        cursor: pointer;
        background-color: $w;
        display: flex;
        padding: 8px 10px;
        justify-content: space-between;
        margin: 0 0 2px 0;
        .arrowGroup{
            width: 10px;
            display: flex;
            flex-wrap: wrap;
            margin: 0 0 0 5px;
            svg{
                margin: -6px 0;
                &:first-child{
                    margin: -3px 0 -5px 0;
                }
            }
        }
    }
    .selectList{
        background-color: $w;
        position: absolute;
        width: 100%;
        z-index: 2;
        li{
            padding: 8px 10px;
            cursor: pointer;
            &:hover{
                background-color: $b;
                color: $g;
            }
        }
    }
</style>

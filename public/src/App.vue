<template>
  <div id="app" :class="$store.state.switchDay">
        <header>
            <div class="container">
                <h1>Comicomic</h1>
            </div>
        </header>
        <main>
            <div class="container">
                <router-view></router-view>
            </div>
        </main>
  </div>
</template>

<script>
import Index from './components/Index'
export default {
  data () {
    return {
    }
  },
  components: {
      Index
  }

}
</script>

<style lang="scss">
    @import './assets/common';
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
    }
    img{
        width: 100%;
    }
    .container{
        max-width: 760px;
        margin: auto;
    }
    .bf{
        font-weight: bold;
    }
    #app{
        background-color: $gray;
        min-height: 100vh;
        &> header{
            background-color: $b;
            h1{
                text-align: center;
                color: $g;
                font-style: italic;
                font-size: 30px;
                padding: 10px 0;
                font-weight: 900;
            }
        }
        &> main{
            padding: 20px;
        }
        &.night{
            background-color: $b;
            color:$w;
            &> header{
                background-color: $g;
                h1{
                    color: $b;
                }
            }
            .selectWrapper{
                color:$b;

            }
            .switchGroup{
                background-color: $b;
                border-color: $w;
                .switcher{
                    background-color: $w;
                }
            }
        }
    }
</style>

<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" alt="" width="80%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">
                        查找
                    </van-button>
                </van-col>
            </van-row>
        </div>
        <!-- swiper area -->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicAarray" :key="index">
                    <img v-lazy="banner.image" alt="" width="100%;">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type bar -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" alt="" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!-- adbanner area -->
        <div>
            <img v-lazy="adBanner" alt="" width="100%">
        </div>
        <!-- Recommend goods area -->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <!-- swiper -->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommenGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" alt="" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price}}（￥{{item.mallPrice}}）</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- 第一楼层 -->
        <floor-component :floorData = "floor1"></floor-component>
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    import floorComponent from '../component/floorComponent'
    export default {
        data() {
            return {
                locationIcon: require('../../assets/images/location.png'),
                bannerPicAarray: [], //轮播图
                category: [],        //分类目录
                adBanner: '',        //广告图
                recommenGoods: [],   //推荐商品
                swiperOption: {
                   slidesPerView: 3
                },
                floor1: [],
            }
        },
        components: {swiper,swiperSlide,floorComponent},
        created() {
            axios({
                url: 'https://www.easy-mock.com/mock/5aeaba62251a9a4ac1d1e26b/smileVue/index',
                method: 'get'
            })
            .then(response => {
                if(response.status === 200) {
                    this.category = response.data.data.category;
                    this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicAarray = response.data.data.slides;
                    this.recommenGoods = response.data.data.recommend;
                    this.floor1 = response.data.data.floor1;
                }
            }).catch(error => {
                console.log(error);            
            })
        }
    }
</script>

<style lang="less" scoped>
    .search-bar {
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input {
        width: 100%;
        height: 1.3rem;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 1px solid #fff;
        background-color: #e5017d;
        color: #ffffff;
    }
    .location-icon {
        padding-top: .2rem;
        padding-left: .3rem;
    }
    .swiper-area {
        clear: both;
        max-height: 12rem;
        overflow: hidden;
    }
    .type-bar {
        background-color: #ffffff;
        margin: 0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        div {
            padding: .3rem;
            font-size: 12px;
            text-align: center;
        }
    }
    .recommend-area {
        background-color: #ffffff;
        margin-top: .3rem;
        .recommend-title {
            border-bottom: 1px solid #eeeeee;
            font-size: 14px;
            padding: .2rem;
            color: #e5017d;
        }
        .recommend-body{
            border-bottom: 1px solid #eee;
            .recommend-item{
                width:99%;
                border-right: 1px solid #eee;
                font-size: 12px;
                text-align: center;
            }
        }
    }
    
</style>
<template>
    <div>
        <div class="floor">
            <div class="floor-title">
                <div class="floor-number">1F</div>
                <div class="floor-type">休闲食品</div>
            </div>
            <div class="floor-abnormal">
                <div class="floor-one">
                    <img :src="floorData0.image" alt="" width="100%">
                </div>
                <div>
                    <div class="floor-two">
                        <img :src="floorData1.image" alt="" width="100%">
                    </div>
                    <div>
                        <img :src="floorData2.image" alt="" width="100%">
                    </div>
                </div>
            </div>
            <div class="floor-normal">
                <div v-for="(item,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" alt="" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['floorData'],
        data() {
            return {
                floorData0: {},
                floorData1: {},
                floorData2: {},
            }
        },
        watch: {
            floorData: function (val) {
                [this.floorData0,this.floorData1,this.floorData2] = [this.floorData[0],this.floorData[1],this.floorData[2]]
            }
        },
        created() {

        }
    }
</script>

<style lang="less" scoped>
    .floor-title {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .5rem;
        font-size: 14px;
        color: #e5017d;
        .floor-number {
            width: 1.2rem;
            height: 1.2rem;
            text-align: center;     
            background-color: #e5017d;
            border-radius: 50%;
            color: #ffffff;
            margin-right: .8rem;
        }
    }
    .floor-abnormal {
        display: flex;
        flex-direction: row;
        background-color: #ffffff;
        border-bottom: 1px solid #dddddd;
        div {
            width: 10rem;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
        }
        .floor-one {
            border-right: 1px solid #dddddd;
        }
        .floor-two {
            border-bottom: 1px solid #dddddd;
        }
    }
    .floor-normal {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #ffffff;
        div {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            width: 10rem;
            border-bottom: 1px solid #dddddd;
            &:nth-child(odd) {
                border-right: 1px solid #dddddd;
            }
        }
    }
</style>
<template>
  <div class="goods-list">
    <div class="goods-item" v-for="i in 3" :key="i">
      <img
        class="goods-img"
        src="https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/93701/37/15663/119974/614464c4Efb407602/f95c78e0938579db.jpg!q70.dpg.webp"
      />
      <div class="goods-info">
        <div class="goods-name">
          TP-LINK AC1200 5G双频智能无线路由器 四天线智能wifi 稳定穿墙高速家用
          TL-WDR5660易展版
        </div>
        <div class="goods-price">¥129.00</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  .goods-item {
    width: 50%;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .goods-img {
    width: 100%;
  }

  .goods-info {
    .goods-name {
      font-size: 14px;
      line-height: 16px;
      height: 32px;
      overflow: hidden;
      display: -webkit-box; /* Safari/Chrome */
      display: -moz-box; /* Firefox */
      -webkit-line-clamp: 2; /* Safari/Chrome */
      -moz-line-clamp: 2; /* Firefox */
      line-clamp: 2; /* Standard syntax */
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      word-break: break-all;
      margin-bottom: 10px;
    }

    .goods-price {
      font-size: 16px;
      color: red;
    }
  }
}
</style>

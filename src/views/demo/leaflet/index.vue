<template>
    <div class="map-wrapper">
        <div id="map"></div>

        <!-- 楼层菜单 -->
        <div class="floor-list" v-if="floorList.length">
            <div
                class="floor-item"
                :class="{ 'floor-item-active': curFloor === floor.id }"
                v-for="floor in floorList"
                :key="floor.id"
                @click="onChangeFloor(floor)"
            >
                {{ floor.name }}
            </div>
        </div>

        <!-- 底部菜单 -->
        <div class="menu-footer flex-box flex-wrap">
            <div
                class="menu-item flex-box-column flex-h-center flex-v-center"
                v-for="facility in publicFacilitiesList"
                :key="facility.id"
                @click="onClickFacility(facility)"
            >
                <div :class="`icon iconfont ${facility.icon}`"></div>
                <div class="name">{{ facility.name }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import Decimal from 'decimal.js';

// 楼层列表
const floorList = [
    {
        id: 1,
        floorImg: 'https://s21.ax1x.com/2024/06/28/pk6DNdJ.jpg',
        name: 'L6'
    },
    {
        id: 2,
        floorImg: 'https://s21.ax1x.com/2024/06/28/pk6DUo9.jpg',
        name: 'L7'
    }
];

// 工具方法，勾股定理计算两坐标点距离（非真实距离）
function getDistance(a, b) {
    const dis = [new Decimal(b[0]).sub(new Decimal(a[0])), new Decimal(b[1]).sub(new Decimal(a[1]))];
    return Math.sqrt(Math.pow(dis[0], 2) + Math.pow(dis[1], 2)).toFixed(6);
}

// 地图图片坐标范围
let mapImgBounds = [
    [31.110822, 121.452],
    [31.119822, 121.464]
];
// 地图初始化
let map;
let imageOverlay;
const initMap = () => {
    // 设置地图中心点及缩放级别
    map = L.map('map', {
        zoomControl: false, // 缩放控制器
        minZoom: 15,
        maxZoom: 18,
        zoomAnimationThreshold: 1
    }).setView([31.113262, 121.458], 15);

    // 添加瓦片地图，因为我们要使用图片作为地图，所以这里不用加载地图数据
    // const txUrl = 'http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0';
    // L.tileLayer(txUrl,{subdomains: '0123',tms:true}).addTo(map);

    // 定义地图边界
    const mapBounds = [
        [31.09, 121.45],
        [31.13, 121.48]
    ];
    map.setMaxBounds(mapBounds);

    // 地图点击事件
    const popup = L.popup();
    map.on('click', (e) => {
        const lat = e.latlng.lat.toFixed(6);
        const lng = e.latlng.lng.toFixed(6);
        onClickMap([lat, lng]);

        // popup
        //   .setLatLng(e.latlng)
        //   .setContent(`点击点坐标：(${e.latlng.toString()})`)
        //   .openOn(map);
    });

    // 创建图片层，此即为用户看到的地图
    // const imageUrl = 'https://img-diy.jytongheng.com/hlazj/zp/image/2024-04/d635b1eef6584fb8856b1c758c2d35aa.jpg';
    // const imageUrl = 'https://img-diy.jytongheng.com/hlazj/zp/image/2024-04/a928481c398d40288300bfb15319d5c1.png'
    const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
    const altText = '';
    const imageBounds = L.latLngBounds(mapImgBounds); // 设置图片边界

    imageOverlay = L.imageOverlay(floorList[0].floorImg, imageBounds, {
        opacity: 1,
        errorOverlayUrl,
        alt: altText,
        interactive: true,
        zIndex: 450
    }).addTo(map);
};

// 批量增加公共设施或店铺标记点
let markerGroup;
function addMarkerGroupToMap(pointList, iconUrl) {
    if (markerGroup) {
        markerGroup.clearLayers();
    }
    // 无要标记的点
    if (!pointList || pointList.length == 0) {
        return;
    }
    // 根据点位数据批量创建标记点对象
    const markers = [];
    pointList.forEach((point) => {
        const options = {};
        if (iconUrl) {
            options.icon = L.icon({
                iconUrl,
                iconSize: [36, 36], // size of the icon
                iconAnchor: [18, 18] // point of the icon which will correspond to marker's location
            });
        }
        // 创建标记点对象
        const marker = L.marker(point, options).on('click', (e) => {
            console.log(e, 'e');
        });
        markers.push(marker);
    });
    markerGroup = L.layerGroup(markers);
    map.addLayer(markerGroup);

    // 当要标记的点只有一个时，放大地图并切换视图
    if (pointList.length == 1) {
        map.setView(pointList[0], 18);
    } else {
        map.setZoom(15);
    }
}

// 点击某一设施，在地图上增加对应的标记点
const onClickFacility = async (facility) => {
    const { icon, useDefault, location } = facility;

    // 取出设施要显示的图标
    let iconUrl = '';
    if (useDefault == 0) {
        iconUrl = `${icon}`;
    }

    if (location.length > 0) {
        addMarkerGroupToMap(location, iconUrl);
    } else {
        showToast('未查询到该设施位置');
    }
};

// 公共设施列表
const publicFacilitiesList = [
    {
        id: 1,
        icon: 'icon-toilet',
        name: '卫生间',
        location: [
            [31.117476, 121.456456],
            [31.113908, 121.45666]
        ]
    },
    {
        id: 2,
        icon: 'icon-elevator',
        name: '电梯',
        location: [
            [31.114399, 121.460442],
            [31.114386, 121.45835],
            [31.11742, 121.455526]
        ]
    },
    {
        id: 3,
        icon: 'icon-escalator',
        name: '自动扶梯',
        location: [[31.115598, 121.460587]]
    },
    {
        id: 4,
        icon: 'icon-reception',
        name: '服务台',
        location: [['31.115598', '121.459192']]
    },
    {
        id: 5,
        icon: 'icon-nursery',
        name: '母婴室',
        location: [['31.116204', '121.458715']]
    },
    {
        id: 6,
        icon: 'icon-smookingroom',
        name: '吸烟室',
        location: [['31.114367', '121.461118']]
    }
];

const curFloor = ref(1);
const onChangeFloor = (floor) => {
    const { id, floorImg } = floor;
    if (id === curFloor.value) return;

    // 清除标记点
    if (markerGroup) {
        markerGroup.clearLayers();
    }
    curFloor.value = id;
    // 切换楼层图片
    if (floorImg) {
        imageOverlay.setUrl(floorImg);
        map.setZoom(15);
    }
};

// 页面挂载
onMounted(async () => {
    // 初始化地图
    initMap();
    // 从外部页面跳转进入地图，携带商户id参数
    // let params = analysisUrl(window.location.href);
    // if (params?.id) {
    //     let res = await getMerchantDetail({ id: params.id });
    //     if (res?.result?.mainDto) {
    //         const { id, name, imgList, positionList, classificationList } = res.result?.mainDto;
    //         const icon = imgList ? imgList[0]?.imgUrl : '';
    //         const { location, plate, useDefault = 0, floorName, floorId } = positionList[0];
    //         const locationArr = transformLocationToArr(location);
    //         searchResult.value = [{ id, icon, name, useDefault, locationArr, plate: `${floorName}层${plate}`, classificationList }];
    //         searchKey.value = name;
    //         await queryFloorList(floorId);
    //     }
    // } else {
    //     queryFloorList();
    // }
});

// 点击地图，查询距离点地点最近的商户位置
function onClickMap(clickPoint) {
    // 点击点坐标不在地图范围内
    if (
        clickPoint[0] < mapImgBounds[0][0] ||
        clickPoint[0] > mapImgBounds[1][0] ||
        clickPoint[1] < mapImgBounds[0][1] ||
        clickPoint[1] > mapImgBounds[1][1]
    ) {
        console.log('超出地图范围');
        return;
    }

    console.log(clickPoint, 'clickPoint');

    // onClickFacility(null);
}
</script>

<style lang="scss" scoped>
.map-wrapper {
    width: 375px;
    height: 800px;
    overflow: hidden;
    border: 1px dashed #fff;
    box-sizing: border-box;
    margin: 0 auto;
    background-color: #f5f5f5;
    position: relative;
}
#map {
    height: 100%;
    width: 100%;
}
.menu-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    min-height: 200px;
    background-color: #fff;
    border-radius: 24px 24px 0 0;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;

    .menu-item {
        width: 25%;
        .icon {
            font-size: 20px;
        }

        .name {
            font-size: 14px;
            color: #333;
            margin-top: 10px;
        }
    }
}

.floor-list {
    position: absolute;
    top: 5%;
    left: 20px;
    z-index: 10000;
    background-color: #e5e6eb;
    padding: 20px 10px;
    border-radius: 40px;

    .floor-item {
        margin-bottom: 10px;
        padding: 10px;
        line-height: 1;
        &-active {
            background-color: #fff;
            border-radius: 20px;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>

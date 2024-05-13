<script setup lang="ts">
import BoardCenterComponent from '@/components/board/BoardCenterComponent.vue';
import BoardCornerComponent from '@/components/board/BoardCornerComponent.vue';
import BoardRowComponent from '@/components/board/BoardRowComponent.vue';
import type { BoardSpaceProperty } from 'env';

const tmpData: BoardSpaceProperty[] = [
    { type: 'property', class: { property: true, 'light-blue': true }, name: 'Connecticut Avenue', price: 'Price $120', },
    { type: 'property', class: { property: true, 'light-blue': true }, name: 'Vermont Avenue', price: 'Price $100', },
    { type: 'chance', class: { chance: true }, name: 'Chance' },
    { type: 'property', class: { property: true, 'light-blue': true }, name: 'Oriental Avenue', price: 'Price $100', },
    { type: 'special', class: { 'fa-subway': true }, name: 'Reading Railroad', price: 'Price $200' },
    { type: 'property', class: { property: true, 'dark-purple': true }, name: 'Baltic Avenue', price: 'Price $50', },
    { type: 'property', class: { property: true, 'dark-purple': true }, name: 'Baltic Avenue', price: 'Price $50', },
    { type: 'special', class: { 'fa-cube': true }, name: 'Community Chest', instruction: 'Follow instructions on top card' },
    { type: 'property', class: { property: true, 'dark-purple': true }, name: 'Mediter-\nranean\nAvenue', price: 'Price $50', },
];
</script>

<template>
    <div class="board">
        <BoardCenterComponent />
        <!-- 하 -->
        <BoardCornerComponent :data="{ class: { corner: true, go: true } }">
            <div class="container">
                <div class="instructions">Collect $200.00 salary as you pass</div>
                <div class="go-word">Go</div>
            </div>
            <div class="arrow fa fa-long-arrow-left"></div>
        </BoardCornerComponent>
        <BoardRowComponent :class="{ 'horizontal-row': true, 'bottom-row': true }" :space-data-list="tmpData" />
        <!-- 좌 -->
        <BoardCornerComponent :data="{ class: { corner: true, jail: true } }">
            <div class="container">
                <div class="name">감옥</div>
                <i class="fa fa-gavel"></i>
                <div class="name">전세사기로 붙잡혀<br> 3턴동안 휴식</div>
            </div>
        </BoardCornerComponent>
        <BoardRowComponent :class="{ 'vertical-row': true, 'left-row': true }" :space-data-list="tmpData" />
        <!-- 상 -->
        <BoardCornerComponent :data="{ class: { corner: true, 'free-parking': true } }">
            <div class="container">
                <div class="name">Free</div>
                <i class="drawing fa fa-car"></i>
                <div class="name">Parking</div>
            </div>
        </BoardCornerComponent>
        <BoardRowComponent :class="{ 'horizontal-row': true, 'top-row': true }" :space-data-list="tmpData" />
        <!-- 우 -->
        <BoardCornerComponent :data="{ class: { corner: true, 'go-to-jail': true } }">
            <div class="container">
                <div class="name">Go To</div>
                <i class="drawing fa fa-gavel"></i>
                <div class="name">Jail</div>
            </div>
        </BoardCornerComponent>
        <BoardRowComponent :class="{ 'vertical-row': true, 'right-row': true }" :space-data-list="tmpData" />
    </div>
</template>

<style scoped>
.jail .container {
    justify-content: center;
}

.instructions {
    position: absolute;
}
</style>
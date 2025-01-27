import {ref} from "vue";
import type {SkeletonItem} from "../types.ts";

export const bottomSkeletonItems = ref<SkeletonItem[]>([
    {width: '95%', height: '36px', margin: '0'},
])

export const leftSkeletonItems = ref<SkeletonItem[]>([
    {width: '190px', height: '26px', margin: '24px'},
    {width: '155px', height: '10px', margin: '16px'},
    {width: '190px', height: '10px', margin: '16px'},
    {width: '170px', height: '10px', margin: '16px'},
    {width: '160px', height: '10px', margin: '16px'},
    {width: '140px', height: '10px', margin: '24px'},
    {width: '80px', height: '10px', margin: '0'}
]);

export const skeletonItemsDrawer = ref<SkeletonItem[]>([
    {width: '100%', height: '1px', margin: '16px'},
    {width: '211px', height: '30px', margin: '24px'},
    {width: '211px', height: '10px', margin: '16px'},
    {width: '211px', height: '10px', margin: '16px'},
    {width: '211px', height: '10px', margin: '16px'},
    {width: '180px', height: '10px', margin: '16px'},
    {width: '80px', height: '10px', margin: '24px'},
    {width: '100%', height: '1px', margin: '0'}
]);
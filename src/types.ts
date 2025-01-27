export type GridItem = {
    color: string;
    id: number;
    quantity: number;
    x: number;
    y: number
}

export type DrawerValueType = {
    color: string;
    quantity: number;
    id: number;
    x: number;
    y: number;
}

export type SkeletonItem = {
    width: string;
    height: string;
    margin: string;
}

export type PropsButtonType = {
    bcgColor: string
    color: string;
    text: string;
};

export interface PropsSkeleton {
    skeletonItems: SkeletonItem[];
}
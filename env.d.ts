/// <reference types="vite/client" />

export interface BoardSpaceProperty {
    type: 'property' | 'chance' | 'special',
    class: object,
    name: string,
    price?: string,
    instruction?: string,
};

export interface BoardCornerData {
    class: object
};
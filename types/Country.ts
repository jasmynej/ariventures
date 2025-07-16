type Country = {
    id: number;
    name: string;
    capital: string;
    region: string;
    sub_region: string;
    flag_img: string;
    img: string;
}

type Countries = Country[]

export type {Country, Countries}
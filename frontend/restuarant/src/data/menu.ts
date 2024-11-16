import { MenuItem } from "@/types";
import { zeroAddress } from "viem";

export type MenuItemX = {
  desc: string;
  img_url: string;
} & MenuItem;

const menu: MenuItemX[] = [
  {
    name: "Pizza",
    img_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/800px-Pizza-3007395.jpg",
    cost: 100,
    owner: zeroAddress,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Burger",
    img_url:
      "https://images.squarespace-cdn.com/content/v1/5ec1febb58a4890157c8fbeb/19ebb9ed-4862-46e1-9f7c-4e5876730227/Beetroot-Burger.jpg",
    cost: 80,
    owner: zeroAddress,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Sushi",
    img_url:
      "https://media.istockphoto.com/id/524162462/photo/uramaki-sushi-set.jpg?s=612x612&w=0&k=20&c=5dP095Sf9k2u3K-VUAyk6bGSsa42PwPoaAl2_rTn660=",
    cost: 150,
    owner: zeroAddress,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Pasta",
    img_url:
      "https://static01.nyt.com/images/2024/07/16/multimedia/21EATrex-tomato-pastarex-fkzg/21EATrex-tomato-pastarex-fkzg-square640.jpg",
    cost: 90,
    owner: zeroAddress,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Salad",
    img_url:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Cobb-Salad-main.jpg",
    cost: 60,
    owner: zeroAddress,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    name: "Ice Cream",
    img_url:
      "https://www.seriouseats.com/thmb/psLdr3356yqqFcm1o1_zxQ4YxEY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-dark-chocolate-ice-cream-recipe-hero-446dacb9d3ce443e8e9880dbd095ef4c.jpg",
    cost: 50,
    owner: zeroAddress,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];

export default menu;

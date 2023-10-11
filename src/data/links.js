import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RateReviewIcon from "@mui/icons-material/RateReview";

export const links = [
  {
    name: "Ingredients",
    icon: <SoupKitchenIcon />,
    subLinks: [
      {
        name: "All Ingredients",
        url: "/Ingredients",
      },
      {
        name: "Add Ingredients",
        url: "/ingredient/add",
      },
    ],
  },

  {
    name: "Categories",
    icon: <FastfoodIcon />,
    subLinks: [
      {
        name: "All Categories",
        url: "/categories",
      },
      {
        name: "Add Category",
        url: "/category/add",
      },
    ],
  },
  {
    name: "Meals",
    icon: <RestaurantIcon />,
    subLinks: [
      {
        name: "All Meals",
        url: "/products",
      },
      {
        name: "Add Meal",
        url: "/products/add",
      },
    ],
  },

  {
    name: "Offers",
    icon: <MenuBookIcon />,
    subLinks: [
      {
        name: "All Offers",
        url: "/offers",
      },
      {
        name: "Add Offer",
        url: "/offer/add",
      },
    ],
  },

  {
    name: "Reviews",
    icon: <RateReviewIcon />,
    url: "/reviews",
  },
];

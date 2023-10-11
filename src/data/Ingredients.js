import Typography from "@mui/material/Typography/Typography";

import { formatNumber } from "../components/HelperFunction";

export const ingredientColumns = [
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
  {
    accessorKey: "price_per_piece", //access nested data with dot notation
    header: "Price",
  },
];
export const mealIngredientColumns = [
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
];

export const extraIngredientsColumns = [
  {
    accessorKey: "ingredient.name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "ingredient.name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
  {
    accessorKey: "price_per_kilo", //access nested data with dot notation
    header: "Price Per Kilo",
    Cell: ({ cell }) => {
      const number = formatNumber(cell.getValue());

      return <Typography>{number}</Typography>;
    },
  },
];

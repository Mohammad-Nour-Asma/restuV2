export const orderDetailsColumns = [
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    Cell: ({ cell }) => <span>${cell.getValue()}</span>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "total",
    header: "Total",
    Cell: ({ cell }) => <span>${cell.getValue()}</span>,
  },
];

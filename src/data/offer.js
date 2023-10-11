export const offerColumns = [
  {
    accessorKey: "image", //access nested data with dot notation
    header: "Image",
    size: 100,
    Cell: ({ cell }) => (
      <div>
        <img src={cell.getValue()} alt="" width={100} />
      </div>
    ),
  },
];

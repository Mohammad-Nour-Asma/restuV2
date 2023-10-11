import React, { useState } from "react";
import Page from "../components/common/Page";
import Layout from "../components/common/Layout";
import Table from "../components/Table";
import { extraIngredientsColumns } from "../data/Ingredients";

import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../Request/request";
import Notify from "../components/common/Notify";
import ExtraForm from "./Forms/ExtraForm";
import { useSelector } from "react-redux";

const ExtraIngredients = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const { data, isLoading, isError } = useQuery({
    queryKey: [`Extraingredients-get-${branch_id}`],
    queryFn: () => {
      return request({
        url: `/extraIng/branch/${branch_id}`,
        method: "GET",
      });
    },
  });

  const ingredients = data?.data;
  const deleteProduct = (id) => {
    return request({
      url: `extraIng/${id}`,
      method: "DELETE",
    });
  };

  const deleteMutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      setOpen(true);
    },
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page button={"Add Extra"} link={"/extra/add"} title={"Extra Ingredients"}>
      <Notify
        message={"deleted successfully"}
        open={open}
        handleClose={handleClose}
      />

      <Box sx={{ pb: "20px" }}>
        {isLoading ? (
          <Layout>
            <Skeleton
              sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
              width={"100%"}
              height={"400px"}
            />
          </Layout>
        ) : (
          <Table
            data={ingredients?.data}
            fields={extraIngredientsColumns}
            numberOfRows={ingredients.length}
            enableTopToolBar={true}
            enableBottomToolBar={true}
            enablePagination={true}
            enableColumnFilters={true}
            enableEditing={true}
            enableColumnDragging={true}
            showPreview={false}
            deleteElement={deleteMutate}
            UpdatingForm={ExtraForm}
            routeLink="extraIngredients"
          />
        )}
      </Box>
    </Page>
  );
};

export default ExtraIngredients;

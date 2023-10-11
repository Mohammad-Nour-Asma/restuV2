import React from "react";
import { Box, TextField, Typography, Paper, Alert, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { BiImageAdd } from "react-icons/bi";
import { Formik } from "formik";
import { ingredientValidation } from "../../validations/ingredientsValidation";
import { request } from "../../Request/request";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import Notify from "../../components/common/Notify";
import Price from "../../components/common/Price";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IngredientsForm = ({ row }) => {
  const [updatedIng, setUpdatedIng] = useState({});
  const { branch_id } = useSelector((state) => state.settings);

  let initialValues = { name: "", quantity: "", name_ar: "" };
  if (row) {
    initialValues = {
      name: row.original.name,
      name_ar: row.original.name_ar,
      quantity: row.original.quantity,
    };
  }

  // Submit Hanlder
  const submitHandle = (values) => {
    if (row) {
      let dataToSend = {
        name: values.name,
        name_ar: values.name_ar,
        total_quantity: 10000,
        threshold: 1,
        branch_id: branch_id,
      };

      setUpdatedIng(dataToSend);

      updateIngredient.mutate(dataToSend);
    } else {
      const data = {
        name: values.name,
        name_ar: values.name_ar,
        total_quantity: 10000,
        threshold: 1,
        branch_id: branch_id,
      };
      storeIngredient.mutate(data);
    }
  };

  const storeIngredientRequest = (data) => {
    return request({
      url: "/ingredient/add",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  };

  const navigate = useNavigate();
  const storeIngredient = useMutation({
    mutationFn: storeIngredientRequest,
    onSuccess: () => {
      setOpen(true);
      navigate("/ingredients");
    },
    onError: (err) => {
      setOpen(true);
    },
  });

  const [open, setOpen] = useState(false);
  // handle cloase
  const handleClose = () => {
    setOpen(false);
  };

  // Updating
  const updateIngredientRequest = (data) => {
    return request({
      url: `ingredient/${row.original.id}`,

      method: "PATCH",
      data: data,
    });
  };

  const updateIngredient = useMutation({
    mutationFn: updateIngredientRequest,
    onSuccess: (data) => {
      const newIng = data.data.data;
      setOpen(true);
      row.original.name = newIng.name;
      row.original.name_ar = newIng.name_ar;
      row.original.total_quantity = newIng.total_quantity;
    },
    onError: (err) => {
      setOpen(true);
    },
  });
  return (
    <Paper
      sx={{
        boxShadow: "none !important",
        borderRadius: "12px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "divider",
        p: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <Notify
        message={
          updateIngredient.isError || storeIngredient.isError
            ? "something went wrong"
            : row
            ? "Ingredient updatede Successfully"
            : "Ingredient added successfully"
        }
        open={open}
        handleClose={handleClose}
        type={
          storeIngredient?.isError || updateIngredient?.isError
            ? "error"
            : "success"
        }
      />
      <Formik
        initialValues={initialValues}
        validationSchema={ingredientValidation}
        onSubmit={submitHandle}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 2 }}>
              <TextField
                name="name"
                label="Ingredient Name"
                variant="outlined"
                size="small"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                value={values.name}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField
                name="name_ar"
                label="اسم المكون"
                variant="outlined"
                size="small"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.name_ar && !!errors.name_ar}
                helperText={touched.name_ar && errors.name_ar}
                value={values.name_ar}
              />
            </Box>

            <Stack sx={{ my: 2 }}>
              <LoadingButton
                loading={
                  row ? updateIngredient.isPending : storeIngredient.isPending
                }
                variant="contained"
                type="submit"
                sx={{
                  background:
                    "linear-gradient(to bottom, #dd78ef, #779bc2) !important",
                }}
              >
                <span>Submit</span>
              </LoadingButton>
            </Stack>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

export default IngredientsForm;

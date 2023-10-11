import React, { useEffect } from "react";
import ComponentWrapper from "../../components/ComponentWrapper";
import Table from "../../components/Table";
import { Skeleton, Typography } from "@mui/material";
import { request } from "../../Request/request";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loader from "../../components/common/loader/loader";
import { useErrorBoundary } from "react-error-boundary";
import InterestsIcon from "@mui/icons-material/Interests";
import { RestoreFromTrash } from "@mui/icons-material";

const TopElements = ({ columns, type, entity }) => {
  let api;
  if (type === "top requested products") {
    api = "/mostRequestedProduct";
  } else if (type === "least requested products") {
    api = "/leastRequestedProduct";
  } else if (type === "top rated products") {
    api = "/mostRatedProduct";
  } else if (type === "least rated products") {
    api = "/leastRequestedProduct";
  }

  const { dateFilter, branch_id, fromToFilter, filterState } = useSelector(
    (state) => state.settings
  );

  const getData = () => {
    let data;

    if (filterState === "date") {
      data = {
        year: dateFilter.year,
        month: dateFilter.month,
        day: dateFilter.day,
      };

      const filteredData = Object.keys(data).reduce((accumulator, key) => {
        if (data[key] !== null) {
          accumulator[key] = data[key];
        }
        return accumulator;
      }, {});

      data = filteredData;
    } else if (filterState === "fromTo") {
      data = {
        start_date: `${fromToFilter.from.year}-${fromToFilter.from.month}-${fromToFilter.from.day}`,
        end_date: `${fromToFilter.to.year}-${fromToFilter.to.month}-${fromToFilter.to.day}`,
      };
    }

    console.log(api);

    return request({
      url: `${api}/${branch_id}`,
      method: "POST",
      data: data,
    });
  };

  const { data, isLoading, isError, refetch, error, isRefetching, isSuccess } =
    useQuery({
      queryKey: [
        `get-hello-world${type}-${entity}-${dateFilter.year}-${dateFilter.month}-${dateFilter.day}`,
      ],
      queryFn: getData,
    });

  useEffect(() => {
    refetch();
  }, [
    dateFilter.year,
    dateFilter.month,
    dateFilter.day,
    fromToFilter.to.year,
    fromToFilter.to.month,
    fromToFilter.to.day,
    fromToFilter.from.day,
    fromToFilter.from.year,
    fromToFilter.from.month,
    branch_id,
    filterState,
  ]);

  const orgnizeTheResponse = (response) => {
    console.log(response, " data");
    let data;
    if (
      type === "top requested products" ||
      type === "least requested products"
    ) {
      data = response.map((item) => {
        return {
          name: item.product.name,
          category: item.product.category.name,
          total: item.total,
        };
      });
    } else {
      data = response.map((item) => {
        return {
          name: item.product.name,
          category: item.product.category.name,
          rate: item.product.AvgRating,
        };
      });
    }
    return data;
  };

  if (isError) {
    return <Typography>Error</Typography>;
  }

  if (isSuccess) {
    console.log(data, "data");
  }

  return (
    <ComponentWrapper>
      <Typography
        variant="h6"
        sx={{
          my: 3,
          textTransform: "capitalize",
          background: "linear-gradient(to bottom, #da32f9, #629ad6)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          paddingLeft: "0.4rem",
        }}
      >
        <InterestsIcon
          sx={{
            top: "0.3rem",
            position: "relative",
            color: "#c387f2",
          }}
        />{" "}
        5 {type}
      </Typography>
      {isLoading || isRefetching ? (
        <Skeleton
          sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
          width={"100%"}
          height={"280px"}
        />
      ) : (
        <>
          <Table
            data={orgnizeTheResponse(data?.data?.data)}
            fields={columns}
            numberOfRows={data.data.data.length}
            enableTopToolBar={false}
            enableBottomToolBar={false}
            enablePagination={false}
            enableColumnFilters={false}
            enableEditing={false}
            enableColumnDragging={false}
          />
        </>
      )}
    </ComponentWrapper>
  );
};

export default TopElements;

import { Paper, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { dailyVisitsBarChartOptions } from "../../../data/chartData";

import React from "react";

const BarChart = ({ data }) => {
  const orginizeData = (data) => {
    let arr = new Array(12).fill(0);
    data.forEach((element) => {
      arr[element.RangeHour / 2 - 1] = element.order_count;
    });
    const charTData = {
      name: "peaks time",
      data: arr,
    };
    return charTData;
  };
  const cahrtData = orginizeData(data);

  console.log(data);
  return (
    <Paper
      sx={{
        boxShadow: "none !important",
        borderRadius: "12px",
        padding: "15px",
        height: { xs: "380px", md: "100%" },
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "divider",
      }}
    >
      <Typography variant="h5">Daily Visits Insights</Typography>
      <Chart
        options={dailyVisitsBarChartOptions}
        series={[cahrtData]}
        type="bar"
        width="100%"
        height="90%"
      />
    </Paper>
  );
};

export default BarChart;

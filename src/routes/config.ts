type chartData = {
  labels: string[];
  datasets: {
    label: string;
    borderColor: string;
    data: number[];
  }[];
};

export const flag: string = "landing_page_copy";
export const video_public_id: string = "tgeweblar8soskbe6gzy";
export const chart_data: chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Visit",
      borderColor: "#0064C8",
      data: [10, 30, 50, 20, 25, 44, 80],
    },
  ],
};

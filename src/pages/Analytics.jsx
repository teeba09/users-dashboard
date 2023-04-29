import { message } from "antd";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getUsers } from "../api";
import { useApp } from "../store/useApp";

function Analytics() {
  const navigate = useNavigate();
  const { setIisLogin } = useApp();

  const { data } = useQuery("users", getUsers, {
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const enabledUsers = data?.filter((user) => user?.enabled);
  const disabledUsers = data?.filter((user) => !user?.enabled);

  const chartData = [
    { label: "Enabled Users", value: enabledUsers?.length },
    { label: "Disabled Users", value: disabledUsers?.length },
  ];
  useEffect(() => {
    !localStorage.getItem("token") ? navigate("/login") : setIisLogin(true);
    if (!data) message.warning("something went wrong");
  }, []);
  return (
    <div className=" m-16">
      <h1 className="my-10 flex justify-center">
        The chart below displays the number of enabled and disabled users in the
        system based on the data provided
      </h1>

      <div className="flex justify-center">
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default Analytics;

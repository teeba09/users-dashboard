import { Button, message, Switch, Table } from "antd";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { editUser, getUsers } from "../api";
import AddUserModal from "../components/AddUserModal";
import { queryClient } from "../queryClient";
import { useApp } from "../store/useApp";
function Users() {
  const navigate = useNavigate();
  const { setIisAddUserModal, setIisLogin } = useApp();

  const { loading, data } = useQuery("users", getUsers, {
    refetchOnWindowFocus: false,
    retry: 2,
  });
  const { mutate: editMutate } = useMutation(editUser, {
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries("users");
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleChangeActive = (row) => {
    row.enabled = !row.enabled;
    editMutate(row);
  };
  const columns = [
    {
      title: "Name",
      key: "firstName",
      render: (row) => (
        <h1>
          {row.firstName} {row.lastName}
        </h1>
      ),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
    },
    {
      title: "Status of User Access",
      key: "id",
      render: (row) => (
        <Switch
          loading={loading}
          checked={row.enabled}
          onChange={(state) => handleChangeActive(row)}
        />
      ),
    },
  ];
  useEffect(() => {
    !localStorage.getItem("token") ? navigate("/login") : setIisLogin(true);
    if (!data) message.warning("something went wrong");
  }, []);

  return (
    <div className="m-16">
      <div className="my-10">
        <Button
          onClick={() => {
            setIisAddUserModal(true);
          }}
        >
          Add User
        </Button>
      </div>
      <Table dataSource={data} columns={columns} />;
      <AddUserModal />
    </div>
  );
}

export default Users;

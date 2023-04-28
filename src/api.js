export const getUsers = async (e) => {
  const res = await fetch(`http://localhost:3001/users`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return res;
};
export const editUser = async (data) => {
  console.log("data", data);
  const res = await fetch(`http://localhost:3001/users/${data.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return res;
};

export const addNewUser = async (data) => {
  fetch(`http://localhost:3001/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

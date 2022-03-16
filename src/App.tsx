import React, { FC, useState, useEffect } from "react";
import { getUsersRequest } from "../src/api/users/users.api";

export const App: FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<any>([]);

  useEffect(() => {
    const usersList = async () => {
      try {
        const resp = await getUsersRequest();
        setFetchedUsers(resp);
      } catch (err) {
        console.log(err);
      }
    };
    usersList();
  }, []);

  console.log("data:", fetchedUsers);

  return <div>App</div>;
};

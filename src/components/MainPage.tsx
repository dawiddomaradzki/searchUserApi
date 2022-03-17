import { FC, useState, useEffect } from "react";
import { getUsersRequest } from "../api/users/users.api";
import { UserCard } from "./userCard/UserCard";
import { Input } from "./input/Input";

import styles from "./MainPage.module.scss";
import { Button } from "./button/Button";

export const MainPage: FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<any>([]);

  const usersList = async () => {
    try {
      const resp = await getUsersRequest();
      setFetchedUsers(resp.data.results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    usersList();
  }, []);

  const displayFetchedUsers = fetchedUsers.map((user: any) => (
    <UserCard
      key={user.email}
      avatar={user.picture.medium}
      title={user.name.title}
      name={user.name.first}
      surname={user.name.last}
      email={user.email}
      city={user.location.city}
    />
  ));

  return (
    <div>
      <div className={styles.navigationWrapper}>
        <Input />
        <Button />
      </div>
      <div className={styles.usersWrapper}>{displayFetchedUsers}</div>
    </div>
  );
};

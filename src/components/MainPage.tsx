import { FC, useState, useEffect } from "react";
import { getUsersRequest } from "../api/users/users.api";
import { UserCard } from "./userCard/UserCard";

import styles from "./MainPage.module.scss";

export const MainPage: FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<any>([]);

  useEffect(() => {
    const usersList = async () => {
      try {
        const resp = await getUsersRequest();
        setFetchedUsers(resp.data.results);
      } catch (err) {
        console.log(err);
      }
    };
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
      <div className={styles.navigationWrapper}>Navigation</div>
      <div className={styles.usersWrapper}>{displayFetchedUsers}</div>
    </div>
  );
};

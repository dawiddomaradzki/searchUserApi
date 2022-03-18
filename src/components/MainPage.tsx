import { FC, ChangeEvent, useState, useEffect } from "react";
import { getUsersRequest } from "../api/users/users.api";
import { UserCard } from "./userCard/UserCard";
import { Input } from "./input/Input";

import styles from "./MainPage.module.scss";
import { Button } from "./button/Button";

export const MainPage: FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<any>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");

  const handleChangeSearchedWord = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedWord(e.target.value);
  };

  const resetInputHandler = () => {
    setSearchedWord("");
  };

  const usersList = async () => {
    try {
      const resp = await getUsersRequest();
      setFetchedUsers([]);
      setTimeout(() => {
        setFetchedUsers(resp.data.results);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    usersList();
  }, []);

  const displayFetchedUsers = fetchedUsers
    .filter(
      (item: any) =>
        item.name.last
          .toLowerCase()
          .includes(searchedWord.toLocaleLowerCase()) ||
        item.name.first.toLowerCase().includes(searchedWord.toLocaleLowerCase())
    )
    .map((user: any) => (
      <UserCard
        key={user.email}
        avatar={user.picture.medium}
        title={user.name.title}
        name={user.name.first}
        surname={user.name.last}
        email={user.email}
        city={user.location.city}
        gender={user.gender}
      />
    ));

  return (
    <div>
      <div className={styles.navigationWrapper}>
        <Input
          inputValue={searchedWord}
          onChange={handleChangeSearchedWord}
          resetInput={resetInputHandler}
        />
        <Button reloadUsers={usersList} />
      </div>
      <div className={styles.usersWrapper}>
        {fetchedUsers.length === 0 ? (
          <div>Loading...</div>
        ) : (
          displayFetchedUsers
        )}
      </div>
    </div>
  );
};

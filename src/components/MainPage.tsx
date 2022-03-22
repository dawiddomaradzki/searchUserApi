import { FC, ChangeEvent, useState, useEffect } from "react";
import { getUsersRequest } from "../api/users/users.api";
import { UserCard } from "./userCard/UserCard";
import { Input } from "./input/Input";
import { Button } from "./button/Button";
import { Data } from "../api/users/users.types";

import styles from "./MainPage.module.scss";

export const MainPage: FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<Data[]>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<Data[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [showUserNoFoundInfo, setShowUserNoFoundInfo] =
    useState<boolean>(false);

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
      setTimeout(() => {
        setIsError(true);
        alert("Something went wrong");
      }, 1000);
    }
  };
  useEffect(() => {
    usersList();
  }, []);

  const displayFetchedUsers = fetchedUsers
    .filter(
      (item: Data) =>
        item.name.last
          .toLowerCase()
          .includes(searchedWord.toLocaleLowerCase()) ||
        item.name.first.toLowerCase().includes(searchedWord.toLocaleLowerCase())
    )
    .map((user: Data) => (
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

  useEffect(() => {
    setSearchedUsers(
      fetchedUsers.filter(
        (item: Data) =>
          item.name.last
            .toLowerCase()
            .includes(searchedWord.toLocaleLowerCase()) ||
          item.name.first
            .toLowerCase()
            .includes(searchedWord.toLocaleLowerCase())
      )
    );

    if (fetchedUsers.length > 0) {
      setShowUserNoFoundInfo(true);
    }
  }, [searchedWord]);

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
        {searchedUsers.length === 0 && showUserNoFoundInfo && (
          <div className={styles.info}>No results</div>
        )}
        {fetchedUsers.length === 0 && isError === false ? (
          <div className={styles.info}>Loading...</div>
        ) : (
          displayFetchedUsers
        )}
      </div>
    </div>
  );
};

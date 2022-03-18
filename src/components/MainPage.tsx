import { FC, ChangeEvent, useState, useEffect } from "react";
import { getUsersRequest } from "../api/users/users.api";
import { UserCard } from "./userCard/UserCard";
import { Input } from "./input/Input";

import styles from "./MainPage.module.scss";
import { Button } from "./button/Button";

export const MainPage: FC = () => {
  const [fetchedUsers, setFetchedUsers] = useState<any>([]);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isError, setIsError] = useState<boolean>(false);

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

  const userNotFound = () => {
    if (fetchedUsers.length !== 0 && searchedUsers.length === 0) {
      return <div className={styles.info}>No user found</div>;
    }
  };

  useEffect(() => {
    setSearchedUsers(
      fetchedUsers.filter(
        (item: any) =>
          item.name.last
            .toLowerCase()
            .includes(searchedWord.toLocaleLowerCase()) ||
          item.name.first
            .toLowerCase()
            .includes(searchedWord.toLocaleLowerCase())
      )
    );

    userNotFound();
  }, [searchedWord]);

  console.log(fetchedUsers);

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
        {userNotFound()}
        {fetchedUsers.length === 0 && isError === false ? (
          <div className={styles.info}>Loading...</div>
        ) : (
          displayFetchedUsers
        )}
      </div>
    </div>
  );
};

import { FC } from "react";
import cn from "classnames";
import { Gender } from "../../api/users/users.types";

import styles from "./UserCard.module.scss";

interface UserCardProps {
  avatar: string;
  title: string;
  name: string;
  surname: string;
  email: string;
  city: string;
  gender: Gender;
}

export const UserCard: FC<UserCardProps> = ({
  avatar,
  title,
  name,
  surname,
  email,
  city,
  gender,
}) => {
  return (
    <section
      className={cn(styles.wrapper, gender === "female" && styles.gender)}
    >
      <div className={styles.imgWrapper}>
        <img src={avatar} alt="Avatar" />
      </div>

      <div className={styles.name}>
        <p>{`${title} ${name} ${surname}`}</p>
      </div>
      <div className={styles.additionalInfo}>
        <p>City: {city}</p>
        <p>email: {email}</p>
      </div>
    </section>
  );
};

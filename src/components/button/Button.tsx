import { FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  reloadUsers: () => void;
}

export const Button: FC<ButtonProps> = ({ reloadUsers }) => {
  return (
    <button className={styles.button} onClick={() => reloadUsers()}>
      Reload users
    </button>
  );
};

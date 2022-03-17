import { FC, ChangeEventHandler } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputValue: string;
  resetInput: () => void;
}

export const Input: FC<InputProps> = ({ onChange, resetInput, inputValue }) => {
  return (
    <input
      placeholder="Search User"
      className={styles.input}
      value={inputValue}
      onChange={onChange}
      onBlur={resetInput}
    />
  );
};

import React from "react";
import { render, screen } from "@testing-library/react";
import { UserCard } from "./UserCard";

test("renders reload users", () => {
  const user = {
    avatar: "test",
    title: "test",
    name: "test",
    surname: "test",
    email: "test",
    city: "test",
    gender: "female",
  };
  render(
    <UserCard
      avatar={user.avatar}
      title={user.title}
      name={user.name}
      surname={user.surname}
      gender={user.gender}
      city={user.city}
      email={user.email}
    />
  );
  const anchorElements = screen.getAllByRole("card");
  expect(anchorElements[0]).toHaveTextContent(user.name);
  expect(anchorElements[0]).toHaveTextContent(user.avatar);
  expect(anchorElements[0]).toHaveTextContent(user.title);
  expect(anchorElements[0]).toHaveTextContent(user.email);
  expect(anchorElements[0]).toHaveTextContent(user.surname);
  expect(anchorElements[0]).toHaveTextContent(user.city);
});

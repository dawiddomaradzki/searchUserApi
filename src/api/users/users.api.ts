import { restApiClient } from "../client";
import { GetUsersResponse } from "./users.types";

export const getUsersRequest = () => {
  return restApiClient.request<GetUsersResponse>({
    method: "GET",
    url: "/api/?results=20",
  });
};

import { restApiClient } from "../client";

export const getUsersRequest = () => {
  return restApiClient.request({
    method: "GET",
    url: "/api/?results=20",
  });
};

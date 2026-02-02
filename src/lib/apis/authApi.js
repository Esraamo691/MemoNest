import { AythApi } from "../constans/auth";

export function callRegisterApi(data) {
  return AythApi.post("/signUp", data)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}
export function callLoginApi(data) {
  return AythApi.post("/signin", data)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

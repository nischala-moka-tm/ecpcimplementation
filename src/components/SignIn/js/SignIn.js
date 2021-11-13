import React from "react";

const API_URL =
  "https://t87cgfw3he.execute-api.us-west-2.amazonaws.com/dev/admin-meta-data/Toyota?fetch=metaDataList";

export function requestAccessToken(data) {
  const loginInfo = `${data}&grant_type=password`;
  return fetch(`${API_URL}Token`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: loginInfo,
  }).then((response) => {
    response.json();
    console.log(response);
  });

  // in your case set state to returned token
}

// use said token to authenticate request
export function requestUserInfo(token) {
  return fetch(`${API_URL}`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  }).then((response) => response.json());
}
function SignIn() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <input type="submit" value="Submit" onSubmit />
      </form>
    </div>
  );
}

export default SignIn;

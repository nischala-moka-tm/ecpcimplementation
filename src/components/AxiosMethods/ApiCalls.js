import React from "react";
import axios from "axios";

const contenttype = "application/json";
const { REACT_APP_API_URL } = process.env;
const API_BASE_URL = "https://axcddc2da3.execute-api.us-west-2.amazonaws.com";
export const AxiosPost = async (props) => {
  const response = await axios.post(
    `${API_BASE_URL}/dev/admin-meta-data/${props.brand}?action=${props.action}&type=${props.type}`,
    JSON.stringify(props.finaldata),
    {
      headers: {
        "Content-type": contenttype,
      },
    }
  );
  return response.data.status;
};

export const AxiosGet = (props) => {
  return axios.get(
    `${API_BASE_URL}/dev/admin-meta-data/${props.brand}?fetch=${props.type}`
  );
};

export const AxiosPut = async (props) => {
  const response = await axios.put(
    `${API_BASE_URL}/dev/admin-meta-data/${props.brand}?action=${props.action}&type=${props.type}`,
    JSON.stringify(props.finaldata),
    {
      headers: {
        "Content-type": contenttype,
      },
    }
  );
  return response.data.status;
};

export const AxiosPostMetadata = async (props) => {
  const response = await axios.post(
    `${API_BASE_URL}/dev/admin-meta-data/${props.adminMetaData.brand}?action=getMetaDataDetails`,
    JSON.stringify(props),
    {
      headers: {
        "Content-type": contenttype,
      },
    }
  );
  return response.data;
};

export const AxiosCreateNewPost = async (props) => {
  const response = await axios.post(
    `${API_BASE_URL}/dev/admin-meta-data/${props.brand}?action=submitAll`,
    JSON.stringify(props.finalData),
    {
      headers: {
        "Content-type": contenttype,
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiIxODBmZmU1Ny0xYTBiLTQwY2EtYWQzMy1iY2Y2YjM4MTNkZGIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOGM2NDJkMWQtZDcwOS00N2IwLWFiMTAtMDgwYWYxMDc5OGZiL3YyLjAiLCJpYXQiOjE2MzUzNDY1OTksIm5iZiI6MTYzNTM0NjU5OSwiZXhwIjoxNjM1MzUwNDk5LCJuYW1lIjoiTmFyZXNoIFRoYW1pbmVuaSAoVE1OQSkiLCJub25jZSI6IjUwMTAzYjZmLWU3OWEtNGI1NC05NmM0LTJhNzVlNGU2YWEwNSIsIm9pZCI6IjgwM2ViMWU4LThlYTktNDU1OS05MGRhLThlOTNhNTllZTkwNiIsInByZWZlcnJlZF91c2VybmFtZSI6Im5hcmVzaC50aGFtaW5lbmlAdG95b3RhLmNvbSIsInJoIjoiMC5BUVFBSFMxa2pBblhzRWVyRUFnSzhRZVktMWYtRHhnTEdzcEFyVE84OXJPQlBkc0VBUGMuIiwicm9sZXMiOlsiR0FQLlN1cGVyVXNlci1Qcm9kIiwiR0FQLlVzZXItUHJvZCJdLCJzdWIiOiJ3V0hUX25QSHg3S2d5eU8tQm5MTTJEU0djQWdreU9tZGZEa3JlM0daTHFnIiwidGlkIjoiOGM2NDJkMWQtZDcwOS00N2IwLWFiMTAtMDgwYWYxMDc5OGZiIiwidXRpIjoiM1ZTVXI1Z0QxVWloVXNIaDdqVkxBUSIsInZlciI6IjIuMCJ9.e-PiK5QzGPA7x5SXENWGmPa4bQ0XDY_tD3JVOEvQk4EWPW6Oegl2uEfl3pAhSBuOf84ghT2RZVaLkJXB1QGBQdG9k1RdrB5ZQVPI23alSFNF5uqfxEtLKbz6GHY7CBhLovj-r9RtzwGYhpMPCLy3X-ivIj3eavUfXuX5moCmgCn49UbDIsE24MxNp60NUkvGGWWofZA_5OR2Ak81xvZ2N2XrJVbo86vLe0dhWnffz6Y9xkqvbCEi-1Db7OKg5DOvejKlcKet0LIbQgOQcHrxjMcS52uRxUEYuTUEZvDgI7CrGL8bySQ0notdPwI3A0fZonBclFs3nmQrWlsqWQCOzA",
      },
    }
  );
  return response.data.status;
};

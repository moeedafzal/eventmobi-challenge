import { notification } from "antd";

const BASE_URL = "https://api.github.com";

const getAllGistUrl = (username) => {
  return `${BASE_URL}/users/${username}/gists`;
};

const getGistsForksURL = (gistId) => {
  return `${BASE_URL}/gists/${gistId}/forks`;
};

const getSingleGistURL = (gistId) => {
  return `${BASE_URL}/gists/${gistId}`;
}

const formatBytes = (bytes, decimalPoint = 2) => {
  if (bytes === 0) return "0 Bytes";
  var k = 1024,
    sizes = ["B", "KB", "MB", "GB", "TB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) +
    " " +
    sizes[i]
  );
};

const errorNotification = ({ key, message, description }) =>
  notification.error({
    key,
    message,
    description,
    duration: 4,
    placement: "topRight",
  });

export {
  getAllGistUrl,
  getGistsForksURL,
  getSingleGistURL,
  errorNotification,
  formatBytes
};

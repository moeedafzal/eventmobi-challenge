import { useEffect, useState } from "react";
import { errorNotification } from "../../utils";
import GistsList from "../GistsList";
import { Input } from "antd";
import useGetAllGistsQuery from "../../hooks/useGetAllGistsQuery";

const { Search } = Input;

const UserGists = () => {
  const [username, setUsername] = useState("");
  const [noGistsAvailable, setNoGistsAvailable] = useState(false);

  const {
    data: gistData,
    isError,
    error,
    refetch: fetchGistData,
    isLoading,
  } = useGetAllGistsQuery({ username });

  useEffect(() => {
    if (username && username.trim().length) {
      fetchGistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (isError) {
      errorNotification({
        key: "gist-fetch-error",
        message: "Error fetching gists",
        description: "Error fetching gists, please try again later!",
      });
      console.log("Error: ", error);
      return;
    }
    if (gistData && !gistData.length) {
      setNoGistsAvailable(true);
    }
  }, [error, gistData, isError]);

  return (
    <>
      <Search
        placeholder="Search by username"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={setUsername}
        onChange={() => setNoGistsAvailable(false)}
        loading={isLoading}
      />
      {noGistsAvailable && !isError && (
        <h5>{`No gists found for the user with username "${username}"!`}</h5>
      )}

      {gistData && gistData.length && !isError ? (
        <GistsList userData={gistData} username={gistData[0].owner.login} />
      ) : null}
    </>
  );
};

export default UserGists;

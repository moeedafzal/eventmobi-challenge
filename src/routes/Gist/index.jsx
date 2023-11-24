import React from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { Alert, Card, Divider } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import ForksDetails from "../../components/ForksDetails";
import FilesDetails from "../../components/FilesDetails";
import useGetGistDataQuery from "../../hooks/useGetGistDataQuery";
import useGetForksDataQuery from "../../hooks/useGetForksDataQuery";

const CARD_STYLES = { minHeight: "50vh" };

const Gist = () => {
  const { gistId } = useParams();

  const { data: forksData, status: forksFetchStatus } = useGetForksDataQuery({
    gistId,
  });

  const { data: gistData, status: gistFetchStatus } = useGetGistDataQuery({
    gistId,
  });

  const forkQueryErrored = forksFetchStatus === "error";
  const gistQueryErrored = gistFetchStatus === "error";

  if (forkQueryErrored || gistQueryErrored) {
    return (
      <>
        <Header onlyLogo />
        <Alert
          data-testid="content-errored"
          message={
            forkQueryErrored ? "Error fetching forks" : "Error fetching gist"
          }
          description={`There was an error fetching ${
            forkQueryErrored ? "forks" : "gist"
          } data. Please try again later.`}
          type="error"
          showIcon
          style={{ marginTop: 10 }}
        />
      </>
    );
  }

  if (forksFetchStatus === "pending" || gistFetchStatus === "pending") {
    return (
      <>
        <Header onlyLogo />
        <Card
          data-testid="content-loading"
          style={{ cursor: "initial" }}
          hoverable
          bodyStyle={CARD_STYLES}
          loading
        ></Card>
      </>
    );
  }

  return (
    <>
      <Header onlyLogo />
      <Card
        title={
          <a href={gistData.html_url} target="_blank" rel="noreferrer">
            <LinkOutlined /> {gistData.description || "No description found"}
          </a>
        }
        hoverable
        style={{ cursor: "initial" }}
        bodyStyle={CARD_STYLES}
      >
        <ForksDetails forks={forksData} />
        <Divider style={{ background: "#ccc" }} />
        <FilesDetails files={gistData.files} />
      </Card>
    </>
  );
};

export default Gist;

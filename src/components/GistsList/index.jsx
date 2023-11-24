import GistCard from "../GistCard";
import { Row, Col } from "antd";

const GistsList = ({ userData, username }) => {
  return (
    <>
      <h5>{`${userData.length} gists found for "${username}"!`}</h5>
      <Row gutter={[20, 20]} justify="space-evenly" data-testid="gists-list">
        {userData.map((gist) => {
          return (
            <Col key={gist.id}>
              <GistCard gistData={gist} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default GistsList;

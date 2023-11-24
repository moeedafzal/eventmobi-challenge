import { Divider, Card, Typography, Row, Col, Tag } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import UniqueFilesTags from "../UniqueFilesTags";
import { formatBytes } from "../../utils";

const { Title } = Typography;

const FilesDetails = ({ files }) => {
  const totalNumberOfFiles = Object.keys(files).length;
  return (
    <>
      <Title level={2}>Files Details</Title>
      <Divider />
      <Title level={4}>Total Forks: {totalNumberOfFiles}</Title>
      <Divider />
      <Title level={4}>Unique Languages:</Title>
      <UniqueFilesTags files={files} />
      {!!totalNumberOfFiles && (
        <>
          <Divider />
          <Title level={4}>Files:</Title>
          <Row gutter={[10, 10]} justify="space-evenly">
            {Object.values(files).map((file) => {
              return (
                <Col>
                  <Card
                    bodyStyle={{ textAlign: "center" }}
                    style={{ minWidth: 300, cursor: "initial" }}
                    title={
                      <a href={file.raw_url} target="_blank" rel="noreferrer">
                        {file.filename} <LinkOutlined />
                      </a>
                    }
                  >
                    <div style={{ marginBottom: 8 }}>
                      <b>Language: </b>
                      <Tag color="volcano">{file.language || file.type}</Tag>
                    </div>
                    <div>
                      <b>File Size: </b>
                      {formatBytes(file.size, 2)}
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default FilesDetails;

import { Divider, Card, Avatar, Typography, Row, Col } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ForksDetails = ({ forks }) => {
  const sortedForks = forks.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  const latestForks = sortedForks.slice(0, 3);
  const totalNumberOfForks = forks.length;

  return (
    <>
      <Title level={2}>Forks Details</Title>
      <Divider />
      <Title level={4}>Total Forks: {totalNumberOfForks}</Title>
      {!!totalNumberOfForks && (
        <>
          <Divider />
          <Title level={4}>Latest Forks:</Title>
          <Row gutter={[10, 10]} justify="space-evenly">
            {latestForks.map((fork) => {
              return (
                <Col>
                  <Card
                    bodyStyle={{ textAlign: "center" }}
                    style={{ minWidth: 300, cursor: "initial" }}
                    title={
                      <a
                        href={fork.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Avatar
                          key={fork.id}
                          src={fork.owner.avatar_url}
                          style={{ marginRight: 10 }}
                        />
                        {fork.owner.login} <LinkOutlined />
                      </a>
                    }
                  >
                    <Text>
                      <b>Created At: </b>
                      {new Date(fork.created_at).toLocaleDateString()}
                    </Text>
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

export default ForksDetails;

import { Card, Divider, Button, Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import UniqueFilesTags from "../UniqueFilesTags";

const { Title, Text } = Typography;

const GistCard = ({ gistData }) => {
  const files = gistData.files;
  const filesLength = Object.keys(files).length;
  const firstFileName = Object.keys(files)[0];

  return (
    <Card
      style={{ cursor: "initial", width: 400 }}
      hoverable
      title={
        <a href={gistData.html_url} target="_blank" rel="noreferrer">
          <LinkOutlined /> {gistData.description || "No description found"}
        </a>
      }
    >
      <Title level={5} style={{ marginTop: 8 }}>
        {filesLength} {filesLength > 1 ? "Files" : "File"}
      </Title>
      <Divider style={{ background: "#ccc" }} />
      <Title level={5}>File name</Title>
      <Text>{firstFileName}</Text>
      <Divider style={{ background: "#ccc" }} />
      <Title level={5}>Languages / File types</Title>
      <UniqueFilesTags files={files} />
      <Divider style={{ background: "#ccc" }} />
      <Button type="primary" href={`/Gist/${gistData.id}`}>
        View Details
      </Button>
    </Card>
  );
};

export default GistCard;

import { Tag } from "antd";

const UniqueFilesTags = ({ files }) => {
  const fileTypes = Object.values(files).map(
    (file) => file.language || file.type
  );
  const uniqueFileTypes = Array.from(new Set(fileTypes));

  return (
    <div>
      {uniqueFileTypes.map((language, index) => (
        <Tag color="volcano" key={index}>
          {language}
        </Tag>
      ))}
    </div>
  );
};

export default UniqueFilesTags;

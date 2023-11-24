import { useQuery } from "@tanstack/react-query";
import { getAllGistUrl } from "../../utils";

const useGetAllGistsQuery = ({username}) => {

  const data = useQuery({
    queryKey: ["gists", username],
    queryFn: async () => {
      const response = await fetch(getAllGistUrl(username), {
        method: "GET",
      });
      const responseData = await response.json();
      return responseData;
    },
    enabled: false,
  });

  return data;
};

export default useGetAllGistsQuery;

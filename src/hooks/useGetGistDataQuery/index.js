import { useQuery } from "@tanstack/react-query";
import { getSingleGistURL } from "../../utils";

const useGetGistDataQuery = ({gistId}) => {
  const data = useQuery({
    queryKey: ["gist", gistId],
    queryFn: async () => {
      const response = await fetch(getSingleGistURL(gistId), {
        method: "GET",
      });
      const responseData = await response.json();
      return responseData;
    },
  });

  return data;
};

export default useGetGistDataQuery;

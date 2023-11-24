import { useQuery } from "@tanstack/react-query";
import { getGistsForksURL } from "../../utils";

const useGetForksDataQuery = ({ gistId }) => {
  const data = useQuery({
    queryKey: ["forks", gistId],
    queryFn: async () => {
      const response = await fetch(getGistsForksURL(gistId), {
        method: "GET",
      });
      const responseData = await response.json();
      return responseData;
    },
  });

  return data;
};

export default useGetForksDataQuery;

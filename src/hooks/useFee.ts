import { useQuery, UseQueryResult } from "react-query";
import { useLightGodwoken } from "./useLightGodwoken";

export const useFee = (): UseQueryResult<string> => {
  const lightGodwoken = useLightGodwoken();

  return useQuery(
    ["queryFee", { l2Address: lightGodwoken?.provider.getL2Address(), value: 0 }],
    () => {
      return lightGodwoken?.getFee({ l2Address: lightGodwoken?.provider.getL2Address(), value: 0 });
    },
    {
      enabled: !!lightGodwoken,
    },
  );
};

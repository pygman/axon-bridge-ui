import {Dispatch, SetStateAction, useEffect, useState} from "react";

export function useBridgeAmount(): { amount: number, setAmount: Dispatch<SetStateAction<number>>} {
  const [amount, setAmount] = useState(() => 0);

  return { amount, setAmount };
}

"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";

export const Counter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button radius="full" onPress={() => setCount(count + 1)}>
        Count is {count}
      </Button>
      {children}
    </>
  );
};

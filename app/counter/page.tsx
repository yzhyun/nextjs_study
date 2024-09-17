import { title } from "@/components/primitives";
import { Counter } from "@/components/counter"
import React from "react";
export default function CounterPage() {
  return (
    <div className="flex flex-col space-y-16">
      <h1 className={title()}>Counter</h1>
      <Counter>
        <h1>서버 콤포넌트에서 들어옴</h1>
      </Counter>
    </div>
  );
}

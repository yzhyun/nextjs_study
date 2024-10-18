"use client";
import { select } from "@nextui-org/theme";
import { Input, Spinner, Button, ButtonGroup } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface FormProps {
  trsMsgCd: string;
}

const arrFormat = [12, 23, 18];

const SendForm = ({ trsMsgCd }: { trsMsgCd: string }) => {
  return (
    <>
    <div className="flex flex-row gap-2 w-full">
      <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-row gap-1">
        <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
          {Array(arrFormat[0])
            .fill(null)
            .map((_, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Input ${index + 1}`}
                labelPlacement="inside"
                color="default"
                className="w-full gap-1 mb-1 pb-1"
              />
            ))}
        </div>
        <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
          {Array(arrFormat[1])
            .fill(null)
            .map((_, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Input ${index + 1}`}
                labelPlacement="inside"
                color="default"
                className="w-full gap-1 mb-1 pb-1"
              />
            ))}
        </div>
        <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
          {Array(arrFormat[2])
            .fill(null)
            .map((_, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Input ${index + 1}`}
                labelPlacement="inside"
                color="default"
                className="w-full gap-1 mb-1 pb-1"
              />
            ))}
        </div>
      </div>
      <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-row gap-1">
        <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
          {Array(arrFormat[0])
            .fill(null)
            .map((_, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Input ${index + 1}`}
                labelPlacement="inside"
                color="default"
                className="w-full gap-1 mb-1 pb-1"
              />
            ))}
        </div>
        <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
          {Array(arrFormat[1])
            .fill(null)
            .map((_, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Input ${index + 1}`}
                labelPlacement="inside"
                color="default"
                className="w-full gap-1 mb-1 pb-1"
              />
            ))}
        </div>
        <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
          {Array(arrFormat[2])
            .fill(null)
            .map((_, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Input ${index + 1}`}
                labelPlacement="inside"
                color="default"
                className="w-full gap-1 mb-1 pb-1"
              />
            ))}
        </div>
      </div>
      </div>
    </>
  );
};

const Form: React.FC<FormProps> = ({ trsMsgCd }) => {
  console.log(trsMsgCd + "==================>");
  //const index = 10;
  return <SendForm trsMsgCd={trsMsgCd} />;
};

export default Form;

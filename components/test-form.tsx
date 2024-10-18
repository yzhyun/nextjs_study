"use client";
import { select } from "@nextui-org/theme";
import { Input, Spinner, Button, ButtonGroup } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { form300, getTrsmsgForm, reqTrsmsg, sendTrsmsg } from "@/data/trsmsg";

interface FormProps {
  trsMsgCd: string;
}

const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault(); // 페이지 새로고침 방지
    const formData = new FormData(e.currentTarget); // 폼 데이터 객체 생성
    const data = Object.fromEntries(formData); // 객체로 변환
    console.log(data);

}

const SendForm = ({ trsMsgCd }: { trsMsgCd: string }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>  {      
          <Button color="warning" className="h-8" type="submit" >요청</Button> 
        }
        <div className="flex flex-row gap-2 w-full">
          <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-row gap-1">
            <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
              {Array(form300.colNum[0])
                .fill(null)
                .map((_, index) => (
                  <Input
                    key={index}
                    type="text"
                    labelPlacement="inside"
                    label={form300.colCommNames[index]}
                    value={form300.colCommInitVal[index]}
                    name={"c_" + (index + 1)}
                    color="default"
                    className="w-full gap-1 mb-1 pb-1"
                  />
                ))}
            </div>
            <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
              {Array(form300.colNum[1])
                .fill(null)
                .map((_, index) => (
                  <Input
                    key={index}
                    type="text"
                    labelPlacement="inside"
                    label={form300.colBodyNames[index]}
                    value={form300.colBodyInitVal[index]}
                    name={"b_" + (index + 1)}
                    color="default"
                    className="w-full gap-1 mb-1 pb-1"
                  />
                ))}
            </div>
            <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
              {Array(form300.colNum[2])
                .fill(null)
                .map((_, index) => (
                  <Input
                    key={index}
                    type="text"
                    labelPlacement="inside"
                    label={form300.colResNames[index]}
                    color="default"
                    className="w-full gap-1 mb-1 pb-1"
                  />
                ))}
            </div>
          </div>
          <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-row gap-1">
            <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
              {Array(form300.colNum[0])
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
              {Array(form300.colNum[1])
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
              {Array(form300.colNum[2])
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
      </form>
    </>
  );
};

const Form: React.FC<FormProps> = ({ trsMsgCd }) => {
  console.log(trsMsgCd + "==================>");
  //const index = 10;
  return <SendForm trsMsgCd={trsMsgCd} />;
};

export default Form;

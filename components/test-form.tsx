"use client";
import { select } from "@nextui-org/theme";
import { Input, Spinner, Button, ButtonGroup, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { form300, getTrsmsgForm, reqTrsmsg, sendTrsmsg } from "@/data/trsmsg";

interface FormProps {
  trsMsgCd: string;
}



const SendForm = ({ trsMsgCd }: { trsMsgCd: string }) => {
  const [windowMessage, setWindowMessage] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    const formData = new FormData(e.currentTarget); // 폼 데이터 객체 생성
    const data = Object.fromEntries(formData); // 객체로 변환
    console.log(data);
    //aaaa
    setWindowMessage(JSON.stringify(data, null, 2))
  }
  return (
    <>
      <form onSubmit={handleSubmit}>  
        <div className="flex flex-col gap-2 w-full">
          <Textarea
          
            label="요청데이터와 결과데이터를 확인하세요."
            labelPlacement="inside"
            // placeholder="요청데이터와 결과데이터를 확인하세요."
            value={windowMessage}
            className="w-full mb-4"
            id="msgWindow"
          />
        </div>
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
          <div className="mt-4 p-4  border-gray-300 rounded-md flex flex-row gap-1">
            <Button color="warning" className="h-8" type="submit" >요청</Button>
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

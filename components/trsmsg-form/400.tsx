"use client";
import { select } from "@nextui-org/theme";
import {
  Input,
  Spinner,
  Button,
  ButtonGroup,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { form400, getTrsmsgForm, reqTrsmsg, sendTrsmsg } from "@/data/trsmsg";
import { request } from "http";

interface FormProps {
  trsMsgCd: string;
}

const SendForm = ({ trsMsgCd }: { trsMsgCd: string }) => {
  const [windowMessage, setWindowMessage] = useState("");
  const [sendSucc, setSendSucc] = useState(false);
  const [commValues, setCommValues] = useState<string[]>(
    form400.colCommInitVal
  ); // 초기 값 상태 관리
  const [bodyValues, setBodyValues] = useState<string[]>(
    form400.colBodyInitVal
  ); // 초기 값 상태 관리
  const [resValues, setResValues] = useState<{ [key: string]: string }>({}); // 객체 형태로 상태 관리

  const sendTrsmsgHandler = async (title: string, requestData: any) => {
    console.log("================> " + requestData.toString);
    const rtn = trsMsgCd ? await sendTrsmsg(trsMsgCd, requestData) : []; // 데이터를 비동기적으로 가져오기
    console.log("1------> " + rtn);
    console.log("2------> " + rtn.resMsg)
    setResValues(rtn.resData);

    let temp = `${rtn.reqMsg}\n\n${rtn.resMsg}`;
    setWindowMessage(temp);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    const formData = new FormData(e.currentTarget); // 폼 데이터 객체 생성
    const data = Object.fromEntries(formData); // 객체로 변환

    console.log(data);
    //aaaa
    //서버로 요청 진행
    //전문 요청
    sendTrsmsgHandler("400", data);

    //응답코드 확인 후 응답 코드가 000 맞으면
    setSendSucc(true);

    setWindowMessage(JSON.stringify(data, null, 2));
  };

  const handleCommChange = (index: number, value: string) => {
    const updatedCommValues = [...commValues];
    updatedCommValues[index] = value;
    setCommValues(updatedCommValues);
  };

  const handleBodyChange = (index: number, value: string) => {
    const updatedBodyValues = [...bodyValues];
    updatedBodyValues[index] = value;
    setBodyValues(updatedBodyValues);

    console.log(`Updated bodyValues:`, updatedBodyValues);
  };

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
          <div className="mt-4 p-4 border border-gray-400 rounded-md flex flex-row gap-1">
            <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
              {commValues.map((value, index) => (
                <Input
                  key={index}
                  type="text"
                  labelPlacement="inside"
                  label={form400.colCommNames[index]}
                  value={value}
                  onChange={(e) => handleCommChange(index, e.target.value)} // 상태 업데이트
                  name={"c_" + (index + 1)}
                  color="default"
                  className="w-full gap-1 mb-1 pb-1"
                />
              ))}
            </div>
            <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
              {bodyValues.map((value, index) => (
                <Input
                  key={index}
                  type="text"
                  labelPlacement="inside"
                  label={form400.colBodyNames[index]}
                  value={value}
                  onChange={(e) => handleBodyChange(index, e.target.value)} // 상태 업데이트
                  name={"i_" + (index + 1)}
                  color="default"
                  className="w-full gap-1 mb-1 pb-1"
                />
              ))}
            </div>
            <div className="flex-row w-full flex-wrap mb-4 pb-1 gap-2">
               {Array(form400.colNum[2])
                .fill(null)
                .map((_, index) => {
                  const key = `o_${index + 1}`; // 동적으로 키 생성 (o_1, o_2, o_3 ...)
                  return (
                    <Input
                      key={index}
                      id={key}
                      name={key}
                      type="text"
                      labelPlacement="inside"
                      label={form400.colResNames[index]}
                      color="default"
                      className="w-full gap-1 mb-1 pb-1"
                      value={resValues[key] ? resValues[key] : ""} // resValues 객체에서 키로 값 가져오기
                    />
                  );
                })}
            </div>
          </div>

          <div className="mt-4 p-4  border-gray-400 rounded-md flex flex-row gap-1">
            <Button color="warning" className="h-8" type="submit">
              요청
            </Button>
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

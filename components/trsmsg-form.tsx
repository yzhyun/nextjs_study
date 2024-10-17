"use client"
import { select } from '@nextui-org/theme';
import {Input, Spinner, Button} from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import {Trsmsg, getTrsmsgForm, getCommData, reqTrsmsg} from "@/data/trsmsg";
import { stringify } from 'querystring';


interface FormProps {
  trsMsgCd: string;
}



const ControlForm = ({ trsMsgCd }: { trsMsgCd: string } ) => {
  
  const [formData, setFormData] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);  //로딩상태 
  const [inputCommValues, setInputCommValues] = useState<string[]>([]); //공통부
  const [inputValues    , setInputValues    ] = useState<string[]>([]); //BODY부

  const handleChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    console.log("1", newInputValues);
    newInputValues[index] = value; // 입력값 업데이트
    console.log("2", newInputValues);
    setInputValues(newInputValues); // 상태 업데이트

    console.log("newInputValues===>" + newInputValues);
  };

  const commHandleChange = (index: number, value: string) => {
    const newInputCommValues = [...inputCommValues];
    newInputCommValues[index] = value; // 입력값 업데이트
    setInputCommValues(newInputCommValues); // 상태 업데이트

    console.log(newInputCommValues);
  };

  
  let commDatas = getCommData(trsMsgCd);
  useEffect(() => {
    
    if (trsMsgCd) {
      console.log(`Fetching data for trsMsgCd: ${trsMsgCd}`);
      commDatas = getCommData(trsMsgCd); //공통정보 조회
      const fetchData = async () => {
        setLoading(true);
        const data =  trsMsgCd ? await getTrsmsgForm(trsMsgCd) : []; // 데이터를 비동기적으로 가져오기
        //setInputValues(new Array(data.form.length).fill(''));
        setFormData(data.form); // 상태 업데이트
        setLoading(false);

        const bodyData = [];
        const commData = [];

        for (const arr of commDatas){
          commData.push(arr[0]);
        }
        for (const arr of data.form){
          bodyData.push(arr[0]);
        }
        
        console.log(commData);
        console.log(bodyData)

        setInputValues(bodyData);
        setInputCommValues(commData);

        console.log("inputValues", inputValues);
        console.log("inputCommValues", inputCommValues);
        // console.log("data=====>", data.form[0]);
        

        //setInputCommValues(commData.map(Trsmsg =>  || '')); // commData 데이터의 각 항목에서 value를 가져옵니다.
      };
    
      fetchData();
    }
  }, [trsMsgCd]); 

  useEffect(() => {
    console.log("inputValues updated:", inputValues);
  }, [inputValues]);
  
  useEffect(() => {
    console.log("inputCommValues updated:", inputCommValues);
  }, [inputCommValues]);
  
  // // 전문 전송
  // const sendHandler = () => {
  //   console.log("buttton click");
  //   console.log("inputCommValues:", inputCommValues);
  //   console.log("inputValues:", inputValues);

  //   const jsonObject: Record<string, Object> = {};
  //   const jsonComm : Record<string, string> = {};
  //   const jsonBody : Record<string, string> = {};


  //   inputValues.forEach((value: string, index: number) => {
  //     jsonBody[`i_${index + 1}`] = value; // i_1 부터 시작
  //   });

  //   inputCommValues.forEach((value: string, index: number) => {
  //     jsonComm[`i_${index + 1}`] = value; // i_1 부터 시작
  //   });
    
  //   jsonObject["comm"] = jsonComm;
  //   jsonObject["body"] = jsonBody;

  //   const data = await reqTrsmsg(trsMsgCd, jsonObject);


    

  //   console.log("==============")
  //   console.log(jsonObject);
  //   // const jsonOutput = JSON.stringify(inputValues);
  //   // console.log("JSON Output");
  //   // console.log("JSON Output:", jsonOutput);
  // }

  const sendHandler = async () => {
    console.log("버튼 클릭");
    console.log("inputCommValues:", inputCommValues);
    console.log("inputValues:", inputValues);

    const jsonObject: Record<string, Record<string, string>> = {
      comm: {},
      body: {},
    };

    inputValues.forEach((value, index) => {
      jsonObject.body[`i_${index + 1}`] = value; // BODY 값
    });

    inputCommValues.forEach((value, index) => {
      jsonObject.comm[`i_${index + 1}`] = value; // 공통 값
    });

    // reqTrsmsg가 정의되어 있고 Promise를 반환한다고 가정
    const data = await reqTrsmsg(trsMsgCd, jsonObject);

    console.log("==============");
    console.log(data);
    console.log(JSON.stringify(data))
  };
  
  return (
    <>
    
    <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-row gap-2">
      <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-col gap-2">{
        
        commDatas.map((item: string[], index: number) => (
        <Input  size="sm" key={index} type="text" labelPlacement="inside" placeholder="" label={item[4]} name={`i_${index + 1}`} 
        onChange={(e) => commHandleChange(index, e.target.value)} 
         defaultValue={item[0]} />
      ))}

      </div>
      <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-col gap-2">{
          loading ? ( <Spinner /> ) : (   
          formData.map((item: string[], index: number) => (
            <Input  size="sm" key={index} type="text" labelPlacement="inside" placeholder="" label={item[4]} name={`i_${index + 1}`} 
            onChange={(e) => handleChange(index, e.target.value)}         
             defaultValue={item[0]}   /> 
          ))
        )  
      }</div>
      <div className="mt-4 p-4 flex flex-col gap-2">
      <Button radius="sm" size="sm" className="h-14" onClick={sendHandler}>전송</Button> 
      </div>
      
    </div>
    
  </>
  );
};

const SendForm = ({ trsMsgCd }: { trsMsgCd: string }) => {
  return (
    <>
      <ControlForm trsMsgCd={trsMsgCd} />
    </>
  );
};



const Form: React.FC<FormProps> = ({ trsMsgCd }) => {
  console.log(trsMsgCd+"==================>");
  //const index = 10;
    return <SendForm trsMsgCd={trsMsgCd}/>;   
};

export default Form;

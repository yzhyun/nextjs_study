"use client"
import { select } from '@nextui-org/theme';
import {Input, Spinner, Button, ButtonGroup} from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import {Trsmsg, getTrsmsgForm, getCommData, reqTrsmsg, sendTrsmsg} from "@/data/trsmsg";
import { stringify } from 'querystring';
import { request } from 'http';


interface FormProps {
  trsMsgCd: string;
}

const SendForm = ({ trsMsgCd }: { trsMsgCd: string }) => {
  const [loading, setLoading] = useState<boolean>(true);  //로딩상태 
  const [sended , setSended]   = useState<boolean>(false);  //로딩상태 
  const [formBodyData, setFormBodyData] = useState<string[][]>([]);
  const [formCommData, setFormCommData] = useState<string[][]>([]);
  
  useEffect(() => {    
    if (trsMsgCd) {
      console.log(`Fetching data for trsMsgCd: ${trsMsgCd}`);
      const getInitData = async () => {
        setLoading(true);
        const data =  trsMsgCd ? await getTrsmsgForm(trsMsgCd) : []; // 데이터를 비동기적으로 가져오기
        //setInputValues(new Array(data.form.length).fill(''));
        setFormBodyData(data.body);     
        setFormCommData(data.comm);      
      }

      getInitData();
      
    }
  }, [trsMsgCd]); 

  useEffect(() => {
    console.log("formData updated:", formCommData);
    
  }, [formCommData]);

  const sendTrsmsgHandler = async (title: string, requestData: any) => {    
    const data =  trsMsgCd ? await sendTrsmsg(trsMsgCd, requestData) : []; // 데이터를 비동기적으로 가져오기
      console.log(data)    
  }


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    const formData = new FormData(e.currentTarget); // 폼 데이터 객체 생성
    const data = Object.fromEntries(formData); // 객체로 변환
    console.log(data); // { "i_1": "example", "i_2": "anotherExample" } 형태


    setSended(false);
    console.log("전송")
    sendTrsmsgHandler("400", data)    
    setSended(true);
  };

  const CnclForm = () => {
    
  }


  return (
    <>    
      <form onSubmit={handleSubmit}>
        {
          sended ? <Button color="default" className="h-8" type="submit" >취소</Button>   
          : <Button color="warning" className="h-8" type="submit" >요청</Button> 
        }        
      
      <div className="mt-4 p-4 border border-gray-300 rounded-md flex gap-2 max-w-4xl">
        {/* 첫 번째 컬럼 */}
        <div className="flex flex-col">
          <div className="mb-2">공통부</div> {/* 상단 명칭 */}
            {formCommData.map((data: string[], index: number) => (
              <div key={index} className="mb-2" >
                <Input
                  labelPlacement="inside" placeholder="" label={data[4]} 
                  size="sm"
                  type="text"
                  value={data[0]} // 첫 번째 값을 value로 사용
                  name={`c_${index + 1}`} // name을 i_1, i_2, ... 형식으로 지정
                  className="border border-gray-300 rounded-md p-2"
                  onChange={(e) => {
                    const newFormData = [...formCommData];
                    newFormData[index][0] = e.target.value; // 입력값을 상태에 반영
                    setFormCommData(newFormData);
                  }}
                />
              </div>
            ))}          
        </div>
        {/* 두 번째 컬럼 */}
        <div className="flex flex-col">
          <div className="mb-2">데이터부</div> {/* 상단 명칭 */}          
            {formBodyData.map((data: string[], index: number) => (
              <div key={index} className="mb-2">
                <Input
                  labelPlacement="inside" placeholder="" label={data[4]}
                  size="sm"
                  type="text"
                  value={data[0]} // 첫 번째 값을 value로 사용
                  name={`i_${index + 1}`} // name을 i_1, i_2, ... 형식으로 지정
                  className="border border-gray-300 rounded-md p-2"
                  onChange={(e) => {
                    const newFormData = [...formBodyData];
                    newFormData[index][0] = e.target.value; // 입력값을 상태에 반영
                    setFormBodyData(newFormData);
                  }}
                />
              </div>
            ))}
          </div>
          {/* 첫 번째 컬럼 */}
          <div className="flex flex-col">
            <div className="mb-2">공통부</div> {/* 상단 명칭 */}
              {formCommData.map((data: string[], index: number) => (
                <div key={index} className="mb-2">
                  <Input
                    labelPlacement="inside" placeholder="" label={data[4]}
                    size="sm"
                    type="text"
                    value={data[0]} // 첫 번째 값을 value로 사용
                    name={`c_${index + 1}`} // name을 i_1, i_2, ... 형식으로 지정
                    className="border border-gray-300 rounded-md p-2"
                    onChange={(e) => {
                      const newFormData = [...formCommData];
                      newFormData[index][0] = e.target.value; // 입력값을 상태에 반영
                      setFormCommData(newFormData);
                    }}
                  />
                </div>
              ))}          
          </div>                     
        </div>        
      </form>
      
    </>
  );
};

const Form: React.FC<FormProps> = ({ trsMsgCd }) => {
  console.log(trsMsgCd+"==================>");
  //const index = 10;
  return <SendForm trsMsgCd={trsMsgCd}/>;   
};

export default Form;

"use client"
import { select } from '@nextui-org/theme';
import {Input, Spinner, Button, ButtonGroup} from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import {Trsmsg, getTrsmsgForm, reqTrsmsg, sendTrsmsg} from "@/data/trsmsg";
import { stringify } from 'querystring';
import { request } from 'http';


const testData = {
  body: [
    ['3000', '4', 'R', ' ', '브랜드코드'],
    ['3000', '20', 'R', ' ', '가맹점코드'],
    ['1', '1', 'R', ' ', '회원식별구분코드'],
    ['7775010000000496', '20', 'R', ' ', '회원식별구분값'],
    ['B', '1', 'R', ' ', '적립사용수단'],
    ['', '1', 'R', ' ', '본인인증구분'],
    ['', '20', 'R', ' ', '비밀번호/본인인증요청번호'],
    ['10000', '10', 'L', '0', '총매출금액'],
    ['0', '10', 'L', '0', '총할인금액'],
    ['0', '10', 'L', '0', '멤버십할인금액'],
    ['10000', '10', 'L', '0', '포인트적립대상금액'],
    ['20241018', '8', 'R', ' ', '결제일자'],
    ['20241018', '8', 'R', ' ', '매출일자'],
    ['1001', '4', 'R', ' ', '거래사유코드'],
    ['N', '1', 'R', ' ', '사후적립여부'],
    ['', '8', 'R', ' ', '원통합승인일자'],
    ['', '10', 'R', ' ', '원통합승인번호'],
    ['', '50', 'R', ' ', '원고유식별번호'],
    ['dev', '20', 'R', ' ', '사용자ID'],
    ['BENE20241018155701_yjh', '50', 'R', ' ', '참여사고유식별번호'],
    ['20241018155701', '30', 'R', ' ', '결제(주문)번호'],
    ['', '10', 'R', ' ', '비고'],
    ['1', '2', 'L', '0', '적립총건수'],
    ['10', '2', 'R', ' ', '포인트유형'],
    ['1500', '10', 'L', '0', '적립포인트'],
    ['1', '1', 'R', '0', '유효기간구분'],
    ['24', '3', 'L', '0', '유효기간'],
    ['1', '1', 'R', '0', '가용처리구분'],
    ['20241018', '8', 'R', '0', '가용화일자'],
    ['1', '2', 'L', '0', '사용총건수'],
    ['11', '2', 'L', '0', '사용포인트유형'],
    ['500', '10', 'L', '0', '사용포인트'],
  ],
  comm: [
    ['400', '3', 'R', ' ', '전문유형'],
    ['41', '2', 'R', ' ', '업무구분'],
    ['V100', '4', 'R', ' ', '전문버전'],
    ['', '4', 'R', ' ', '제휴사코드'],
    ['20241018', '8', 'R', ' ', '거래일자'],
    ['155701', '6', 'R', ' ', '거래시간'],
    ['20241018155701', '18', 'R', ' ', '추적번호'],
    ['OFF', '3', 'R', ' ', '채널유형'],
    ['00000', '5', 'R', ' ', '응답코드'],
    ['', '15', 'R', ' ', '인가번호'],
    ['', '20', 'R', ' ', '부가정보'],
    ['', '12', 'R', ' ', 'FILLER'],
  ],
};

interface FormProps {
  trsMsgCd: string;
}

const SendForm = ({ trsMsgCd }: { trsMsgCd: string }) => {
  const [loading, setLoading] = useState<boolean>(true);  //로딩상태 
  const [sendSucc , setSendSucc]   = useState<boolean>(false);  //로딩상태 
  const [formBodyData, setFormBodyData] = useState<string[][]>([]); //body데이터
  const [formCommData, setFormCommData] = useState<string[][]>([]); //공통데이터
  const [formRsltData, setFormRsltData] = useState<string[][]>([]); // 배열로 상태 관리
  const [visibleRslt, setVisibleRslt] = useState<boolean>(false);


  const [formCnclBodyData, setFormCnclBodyData] = useState<string[][]>([]); //body 취소 데이터
  const [formCnclCommData, setFormCnclCommData] = useState<string[][]>([]); //공통 취소 데이터
  const [formCnclRsltData, setFormCnclRsltData] = useState<string[][]>([]); //공통 취소 데이터

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



  const sendTrsmsgHandler = async (title: string, requestData: any) => {    
    const rtn =  trsMsgCd ? await sendTrsmsg(trsMsgCd, requestData) : []; // 데이터를 비동기적으로 가져오기
    setFormRsltData(rtn.data)
    setVisibleRslt(true);
    console.log(rtn.data)
    console.log(rtn.msg)  
    
    // 결과 데이터에 따라 특정 인덱스의 값을 업데이트
    if (rtn.data && formCommData.length > 0 && formBodyData.length > 0) {
      // 예를 들어, 첫 번째 공통 데이터와 데이터부의 값을 업데이트
      const updatedCommData = [...formCommData];
      const updatedBodyData = [...formBodyData];

      // 특정 인덱스의 값을 업데이트 (여기서는 0번째 인덱스 예시)
      updatedCommData[1][0] = "42"; // 공통부의 첫 번째 값을 결과로 변경
      updatedBodyData[13][0] = "1002"; // 데이터부의 첫 번째 값을 결과로 변경
      updatedBodyData[15][0] = rtn.data[13][2]; // 데이터부의 첫 번째 값을 결과로 변경
      updatedBodyData[16][0] = rtn.data[14][2]; // 데이터부의 첫 번째 값을 결과로 변경
      updatedBodyData[17][0] = formCommData[17][0]; // 데이터부의 첫 번째 값을 결과로 변경


      setFormCommData(updatedCommData); // 업데이트된 공통부 데이터 설정
      setFormBodyData(updatedBodyData); // 업데이트된 데이터부 설정
    }
  }


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    const formData = new FormData(e.currentTarget); // 폼 데이터 객체 생성
    const data = Object.fromEntries(formData); // 객체로 변환
    console.log(data); // { "i_1": "example", "i_2": "anotherExample" } 형태

    //전문 요청 
    sendTrsmsgHandler("400", data)    
    //setSended(true);
    setSendSucc(true);
  };

  const handleCnclSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    const formData = new FormData(e.currentTarget); // 폼 데이터 객체 생성
    const data = Object.fromEntries(formData); // 객체로 변환
    console.log(data); // { "i_1": "example", "i_2": "anotherExample" } 형태

    
    //전문 요청 
    sendTrsmsgHandler("400", data)    
    //setSended(true);

    setFormCnclCommData(formCommData);
    setFormCnclBodyData(formBodyData);

  };
  

  //style={{width:"3000px"}}
  const SendForm = () => {
    return (
        <form onSubmit={handleSubmit}>  {      
          <Button color="warning" className="h-8" type="submit" >요청</Button> 
          
        }
      
        <div className="mt-4 p-4 border border-gray-300 rounded-md flex gap-2 max-w-5xl">
          {/* 첫 번째 컬럼 */}
          <div className="flex flex-col">
            <div className="mb-2">공통부</div> {/* 상단 명칭 */}
              {formCommData.map((data: string[], index: number) => (
                <div key={index} className="mb-2" >
                  <Input
                    labelPlacement="inside" placeholder="" label={data[4]} 
                    size="sm"
                    type="text"
                    defaultValue={data[0]} // 첫 번째 값을 value로 사용
                    name={`c_${index + 1}`} // name을 i_1, i_2, ... 형식으로 지정
                    className="border border-gray-300 rounded-md p-2"
                    onBlur={(e) => {
                      const target = e.target as HTMLInputElement; // 타입 단언
                      setFormCommData(prevData => {
                        const newData = [...prevData];
                        newData[index][0] = target.value; // 포커스가 나갈 때의 값을 상태에 저장
                        return newData;
                      });
                    }
                    }
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
                    defaultValue={data[0]} // 첫 번째 값을 value로 사용
                    name={`i_${index + 1}`} // name을 i_1, i_2, ... 형식으로 지정
                    className="border border-gray-300 rounded-md p-2"
                    onBlur={(e) => {
                      const target = e.target as HTMLInputElement; // 타입 단언
                      setFormCommData(prevData => {
                        const newData = [...prevData];
                        newData[index][0] = target.value; // 포커스가 나갈 때의 값을 상태에 저장
                        return newData;
                      });
                    }
                    }
                  />
                </div>
              ))}
            </div>
            {/* 세 번째 컬럼 */}  
            {visibleRslt ?  
            <div className="flex flex-col">
              <div className="mb-2">결과</div> {/* 상단 명칭 */} 
              {formRsltData.map((data: string[], index: number) => (
              <div key={index} className="mb-2">
                <Input
                  labelPlacement="inside" placeholder="" label={data[1]} 
                  size="sm"
                  type="text"
                  defaultValue={data[2]} // 3 번째 값을 value로 사용
                  name={data[0]} // name을 i_1, i_2, ... 형식으로 지정
                  className="border border-gray-300 rounded-md p-2"
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement; // 타입 단언
                    setFormCommData(prevData => {
                    const newData = [...prevData];
                    newData[index][0] = target.value; // 포커스가 나갈 때의 값을 상태에 저장
                    return newData;
                    });
                  }
                  }                
                />
              </div>
              ))}
              </div> 
            : null }


          </div>
      </form>
    )
  }

  const SendCnclForm = () => {

    return (
        <form onSubmit={handleCnclSubmit}>
        {
          <Button color="default" className="h-8" type="submit" >취소</Button>   
        }        
        <div className="mt-4 p-4 border border-gray-300 rounded-md flex gap-2 max-w-5xl">
          {/* 첫 번째 컬럼 */}
          <div className="flex flex-col">
            <div className="mb-2">공통부</div> {/* 상단 명칭 */}
              {formCnclCommData.map((data: string[], index: number) => (
                <div key={index} className="mb-2" >
                  <Input
                    labelPlacement="inside" placeholder="" label={data[4]} 
                    size="sm"
                    type="text"
                    value={data[0]} // 첫 번째 값을 value로 사용
                    name={`c_${index + 1}`} // name을 i_1, i_2, ... 형식으로 지정
                    className="border border-gray-300 rounded-md p-2"                     
                    onBlur={(e) => {
                      const target = e.target as HTMLInputElement; // 타입 단언
                      setFormCnclCommData(prevData => {
                        const newData = [...prevData];
                        newData[index][0] = target.value; // 포커스가 나갈 때의 값을 상태에 저장
                        return newData;
                      });
                    }
                    }
                  />
                </div>
              ))}          
          </div>
          {/* 두 번째 컬럼 */}
          <div className="flex flex-col">
            <div className="mb-2">데이터부</div> {/* 상단 명칭 */}          
              {formCnclBodyData.map((data: string[], index: number) => (
                <div key={index} className="mb-2">
                  <Input
                    labelPlacement="inside" placeholder="" label={data[4]}
                    size="sm"
                    type="text"
                    value={data[0]} // 첫 번째 값을 value로 사용
                    name={`i_${index + 1}`} // name을 i_1, i_2, ... 형식으로 지정
                    className="border border-gray-300 rounded-md p-2"
                    onBlur={(e) => {
                      const target = e.target as HTMLInputElement; // 타입 단언
                      setFormCnclBodyData(prevData => {
                        const newData = [...prevData];
                        newData[index][0] = target.value; // 포커스가 나갈 때의 값을 상태에 저장
                        return newData;
                      });
                    }
                    }
                  />
                </div>
              ))}
            </div>     
            {/* 세 번째 컬럼 */}
          {visibleRslt ?  
            <div className="flex flex-col">
              <div className="mb-2">결과</div> {/* 상단 명칭 */} 
              {formCnclRsltData.map((data: string[], index: number) => (
              <div key={index} className="mb-2">
                <Input
                  labelPlacement="inside" placeholder="" label={data[1]} 
                  size="sm"
                  type="text"
                  defaultValue={data[2]} // 3 번째 값을 value로 사용
                  name={data[0]} // name을 i_1, i_2, ... 형식으로 지정
                  className="border border-gray-300 rounded-md p-2"
                  onBlur={(e) => {
                    const target = e.target as HTMLInputElement; // 타입 단언
                    setFormCommData(prevData => {
                    const newData = [...prevData];
                    newData[index][0] = target.value; // 포커스가 나갈 때의 값을 상태에 저장
                    return newData;
                    });
                  }
                  }                
                />
              </div>
              ))}
              </div> 
            : null }
          </div>
        
        
      </form>
    )
  }
  return (
    <>    
      <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-row gap-2 max-w-full">
      <SendForm />
      {false ? 
      <SendCnclForm /> : []
      }
      </div>
    </>
  );
};

const Form: React.FC<FormProps> = ({ trsMsgCd }) => {
  console.log(trsMsgCd+"==================>");
  //const index = 10;
  return <SendForm trsMsgCd={trsMsgCd}/>;   
};

export default Form;

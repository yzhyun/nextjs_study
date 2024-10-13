import { select } from '@nextui-org/theme';
import {Input} from "@nextui-org/react";
import React, { useState } from 'react';


interface FormProps {
  selectedValue: string;
}

const Form200 = () =>{
    const [inputValues, setInputValues] = useState<string[]>([
        "11111",
        "22222",
        "33333"
    ]);
    const handleChange = (index: number, value: string) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value; // 입력값 업데이트
        setInputValues(newInputValues); // 상태 업데이트

        console.log(newInputValues);
    };

    return (
        
       
        <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-col gap-2">
            <Input  size="sm" key="key1" type="text" labelPlacement="outside-left" placeholder="why" label="전문구분" onChange={(e) => handleChange(1, e.target.value)}/>
            <Input  size="sm" key="key2" type="text" labelPlacement="outside-left" placeholder="why" label="전문구분" onChange={(e) => handleChange(2, e.target.value)}/>
            <Input  size="sm" key="key3" type="text" labelPlacement="outside-left" placeholder="why" label="전문구분" onChange={(e) => handleChange(3, e.target.value)}/>
            
        </div>
    );
}

const Form: React.FC<FormProps> = ({ selectedValue }) => {

console.log(selectedValue);
const index = 10;
  switch (selectedValue) {
    case "200":
      return (
          <Form200/>
      );
    case "300":
      return <div className="mt-4 p-4 border border-gray-300 rounded-md">이것은 trsmsg300에 대한 내용입니다.</div>;
    case "400":
      return <div className="mt-4 p-4 border border-gray-300 rounded-md">이것은 trsmsg400에 대한 내용입니다.</div>;
      

    // 더 많은 케이스 추가 가능
    default:
      return null; // 기본적으로는 아무것도 렌더링하지 않음
  }
};

export default Form;

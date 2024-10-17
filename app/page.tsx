"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import {Select, SelectItem, Button} from "@nextui-org/react";
import {Trsmsg} from "@/data/trsmsg";
import Form from "@/components/trsmsg-form";

import React, { useState } from 'react';

export default function Home() {
  const [value, setValue] = React.useState("");

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected value:", event.target.value);
    setValue(event.target.value);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title({color: "violet"})}>CJ ONE POINT &nbsp;</h1>        
        <br />
        <h1 className={title()}>
          테스트할 전문을 선택하세요.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
        </h2>
        <br />  
 
        <Select label="Select a trsmsg" className="max-w-xs" onChange={handleSelectionChange}>
          {Trsmsg.map((Trsmsg) => (
            <SelectItem key={Trsmsg.key} value={Trsmsg.key}>
              {Trsmsg.label}
            </SelectItem>
          ))}
        </Select>

        {value && <Form trsMsgCd={value} />} {/* Content 컴포넌트 사용 */}
      </div>
    </section>
  );
}

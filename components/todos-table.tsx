"use client"

import {Table, 
        TableHeader, 
        TableColumn, 
        TableBody, 
        TableRow, 
        TableCell,
        Input,
        Button,
        Popover,
        PopoverContent,
        PopoverTrigger,
        Spinner
      } from "@nextui-org/react";
import { Todo } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TodosTable = ( { todos } : { todos: Todo[] }) => {
  //할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);
  //입력된 할일
  const [newTodoInput, setNewTodoInput] = useState('');
  //로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const addATodoHandler = async (title: string) => {
    if (!todoAddEnable) { return };
    
    setIsLoading(true);
    await new Promise(f => setTimeout(f, 500));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
     method: 'post',
     body: JSON.stringify({
      title: title
     }),
     cache: 'no-store'
    });
    console.log(`할일 추가완료 :`)

    setNewTodoInput('');
    router.refresh();
    setIsLoading(false);
    setTodoAddEnable(false);
    notifyTodoAddedEvent("할일 추가 성공!!");
  };


  const DisabledTodoAddButton = () => {
    return <Popover placement="top" showArrow={true}>
      <PopoverTrigger>
        <Button color="default" className="h-14">
          추가
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">😍</div>
          <div className="text-tiny">할 일을 입력해주세요!</div>
        </div>
      </PopoverContent>
    </Popover>
  }

  const notifyTodoAddedEvent = (msg: string) => toast.success(msg);

  return (
    <div className="flex flex-col space-y-2">
    <ToastContainer
      position="top-right"
      autoClose={1800}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />   
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="text" label="새로운 할일" 
        value={newTodoInput}
        onValueChange={(changedInput) => {
          setNewTodoInput(changedInput);
          setTodoAddEnable(changedInput.length > 0);
        }}
        onKeyDown={ async (event) => {
          if (event.key === 'Enter') { // 엔터 키를 감지
            event.preventDefault(); // 기본 동작 방지
            await addATodoHandler(newTodoInput);
          }
        }}
        />
      {
        todoAddEnable ? 
          <Button color="warning" className="h-14"
            onClick={ async () => {
              console.log("===========onPress")
              await addATodoHandler(newTodoInput)
            }}
          >
            추가
          </Button>:DisabledTodoAddButton()
     
      }
      

    </div>
    <div className="h-6">{isLoading && <Spinner size="sm" color="warning"/>}</div>
    
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>아이디</TableColumn>
        <TableColumn>할일내용</TableColumn>
        <TableColumn>완료여부</TableColumn>
        <TableColumn>생성일</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"보여줄 데이터가 없습니다."}>
        {
            todos && todos.map((aTodo: Todo) => (
            <TableRow key={aTodo.id}>
                <TableCell>{aTodo.id.slice(0,4)}</TableCell>
                <TableCell>{aTodo.title}</TableCell>
                <TableCell>{aTodo.is_done ? "완료" : "미완료"}</TableCell>
                <TableCell>{`${aTodo.created_at}`}</TableCell>
            </TableRow>
            ))
        }
                
      </TableBody>
    </Table>
    </div>
  );
}

export default TodosTable;
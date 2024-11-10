"use client"

import {
  Table,
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
  Spinner,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure

} from "@nextui-org/react";

import { CustomModalType, Todo,FocusedTodoType } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from 'react';
import { VerticalDotsIcon } from "./icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TodosTable = ({ todos }: { todos: Todo[] }) => {
  //할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);
  //입력된 할일
  const [newTodoInput, setNewTodoInput] = useState('');
  //로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  //띄우는 모달상태
  const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: 'detail' as CustomModalType
  }); 
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const ModelComponent: React.FC = () => {
    return (
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <ModelComponent />
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
          onKeyDown={async (event) => {
            if (event.key === 'Enter') { // 엔터 키를 감지
              event.preventDefault(); // 기본 동작 방지
              await addATodoHandler(newTodoInput);
            }
          }}
        />
        {
          todoAddEnable ?
            <Button color="warning" className="h-14"
              onClick={async () => {
                console.log("===========onPress")
                await addATodoHandler(newTodoInput)
              }}
            >
              추가
            </Button> : DisabledTodoAddButton()

        }
      </div>
      <div className="h-6">{isLoading && <Spinner size="sm" color="warning" />}</div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>아이디</TableColumn>
          <TableColumn>할일내용</TableColumn>
          <TableColumn>완료여부</TableColumn>
          <TableColumn>생성일</TableColumn>
          <TableColumn>액션</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"보여줄 데이터가 없습니다."}>
          {
            todos && todos.map((aTodo: Todo) => (
              <TableRow key={aTodo.id}>
                <TableCell>{aTodo.id.slice(0, 4)}</TableCell>
                <TableCell>{aTodo.title}</TableCell>
                <TableCell>{aTodo.is_done ? "완료" : "미완료"}</TableCell>
                <TableCell>{`${aTodo.created_at}`}</TableCell>
                <TableCell><div className="relative flex justify-end items-center gap-2">
                  <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger>
                      <Button isIconOnly radius="full" size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-400" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu onAction= {(key) => {
                      console.log(`aTodo.id = ${aTodo.id} / key: , ${key}` );
                      setCurrentModalData({focusedTodo: aTodo, modalType: key as CustomModalType})
                      onOpen();
                    }}>
                      <DropdownItem key='detail'>상세보기</DropdownItem> 
                      <DropdownItem key='update'>수정</DropdownItem>
                      <DropdownItem key='delete'>삭제</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div></TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
    </div>
  );
}

export default TodosTable;

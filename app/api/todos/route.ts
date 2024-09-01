import { NextRequest, NextResponse } from "next/server";
import dummyTodos from '@/data/dummy.json'
import { fetchTodos, addATodo} from '@/data/firestore'

///  모든 할일 가져오기
export async function GET(request: NextRequest) {
    const fetchedTodos = await fetchTodos();
    
    const response = {
        message: 'todos 모두 가져오기',
        data: fetchedTodos

    };

    return NextResponse.json(response, { status: 200 });

}

/// 할 일 추가하기
export async function POST(request: NextRequest) {
    const { title } = await request.json();
    if (title == null) {
        const errMessage = {
            message: '할 일을 작성해주세요'
        }
        return NextResponse.json(errMessage, { status: 422 });
    }
    const addedTodo = await addATodo({ title });

    
    const response = {
        message: '할일 추가 성공!',
        data: addedTodo
    }

    return Response.json(response, { status: 201 });
}

import { deleteATodo, editATodo, fetchATodo } from "@/data/firestore";
import { NextRequest, NextResponse } from "next/server";

/// 할 일 단일 조회
export async function GET(request: NextRequest,
    { params }: { params: { slug: string } }) {
    
    const searchParams = request.nextUrl.searchParams;
     
    const search = searchParams.get('query');    

    const fetchedTodo = await fetchATodo(params.slug);

    if (fetchedTodo === null) {
        return new Response(null,  { status: 204 });
    }
    const response = {
        message: '단일 할일 가져오기 성공!',
        data: fetchedTodo
    }

    return NextResponse.json(response, { status: 200 });

};

/// 할 일 단일 삭제 id
export async function DELETE(request: NextRequest,
    { params }: { params: { slug: string } }) {
     
    const deletedTodo = await deleteATodo(params.slug);

    if ( deletedTodo === null ) {
        return new Response(null, { status: 204 });

    }
    const response = {
        message: '할일 단일 삭제 성공!',
        data: deletedTodo
    }

    return NextResponse.json(response, { status: 200 });

}

/// 할 일 단일 수정 id
export async function POST(request: NextRequest,
    { params }: { params: { slug: string } }) {
    
    let editedTodo = null;
    const { title, is_done } = await request.json();
    editedTodo = await editATodo( params.slug, { title, is_done});

    console.log(editedTodo)
    if ( editedTodo == null ) {
        return null;
    }

    const response = {
        message: '단일 할일 수정 성공!',
        data: editedTodo
    }

    return NextResponse.json(response, {status: 200});
}

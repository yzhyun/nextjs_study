import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";

async function fetchTodosApiCall(){
  console.log("fetchTodosApiCall");
  const res = await fetch(`${process.env.BASE_URL}/api/todos/`);
  //const res = await fetch(`http://localhost:3000/api/todos/`);

  return res.json();
}

export default async function TodosPage() {
  
  const response = await fetchTodosApiCall();
  console.log(response);
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
      { <TodosTable todos= {response.data ?? []}/> }
    </div>
  );
}

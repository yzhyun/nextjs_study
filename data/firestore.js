// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection, getDocs, getDoc, setDoc, doc, Timestamp, deleteDoc, updateDoc, orderBy, query
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
let app = null;
let db = null;
try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);    
} catch (error){
    console.log(error);
} 

// 모든 할일 가져오기 
export async function fetchTodos() {
    const todosRef = collection(db, "todos");
    const descQuery = query(todosRef, orderBy("created_at", "desc"));

    let querySnapshot = null;
    try {
        querySnapshot = await getDocs(descQuery);

        if (querySnapshot.empty) {
            return [];
        }
    // 데이터 처리
    } catch (error) {
        console.error("==================Error fetching documents: ", error);
    }    

    const fetchedTodos = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        
        const aTodo = {
            id: doc.id,
            title: doc.data()["title"],
            is_done: doc.data()["is_done"],
            created_at: doc.data()["created_at"].toDate(),
            //toLocaleTimeString('ko-KR')
        };
        fetchedTodos.push(aTodo);
        
    });
    return fetchedTodos;
}

// 할일 추가
export async function addATodo( {title} ) {
    const newTodoRef = doc(collection(db, "todos"));
    const createdAtTimestamp = Timestamp.fromDate(new Date());
    const newTodoData = {
        id: newTodoRef.id,
        title: title,
        is_done: false,
        created_at: createdAtTimestamp
    }

    await setDoc(newTodoRef, newTodoData);
    return {
        id: newTodoRef.id,
        title: title,
        is_done: false,
        created_at: createdAtTimestamp.toDate()
    };
}

// 단일 할일 조회
export async function fetchATodo( id ) {
    console.log("단일할일조회 =====")

    if (id === null){
        return null;
    }
    const todoDocRef = doc(db, "todos", id);
    const todoDocSnap = await getDoc(todoDocRef);

    if (todoDocSnap.exists()) {
        console.log("Document data:", todoDocSnap.data());
        
        const fetchedTodo = {
            id: todoDocSnap.id,
            title: todoDocSnap.data()["title"],
            is_done: todoDocSnap.data()["is_done"],
            created_at: todoDocSnap.data()["created_at"].toDate(),
            //toLocaleTimeString('ko-KR')
        };

        return fetchedTodo;
    } else {
    // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return null;
    }
}

// 단일 할일 삭제
export async function deleteATodo( id ) {
    console.log("단일할일삭제 =====")

    const fetchedTodo = await fetchATodo(id);
    if ( fetchedTodo === null ){
        return null;
    } else {
        await deleteDoc(doc(db, "todos", id));
    }
    
    return fetchedTodo;
}

// 단일 할일 수정
export async function editATodo( id, {title, is_done} ) {
    console.log("단일할일수정 =====")

    const fetchedTodo = await fetchATodo(id);
    if ( fetchedTodo == null ){
        return null;
    }

    const todoRef = doc(db, "todos", id);
    const updatedTodo = await updateDoc(todoRef, {title: title, is_done:is_done});
    
    return {
        id: id,
        title: title,
        is_done: is_done,
        create_at: fetchedTodo.created_at
    }

    return updatedTodo;
}

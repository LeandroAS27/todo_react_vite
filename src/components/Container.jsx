import { useState, useReducer } from "react"

const Container = () => {
    const initialTask = () => [
        {id: 1, text: "Estudar React"},
        {id: 2, text: "Jogar CS"},
    ];
    
    const taskReducer = (state, action) => {
        switch (action.type){
            case "ADD":
                { const newTask = {
                    id: Math.random(),
                    text: action.payload,
                };
                setTaskText("")
                return [...state, newTask] }
            case "DELETE":
                return state.filter((task) => task.id !== action.id);
            case "EDIT":
                return state.map((task) => task.id === action.payload.id ? {...task, text: action.payload.text} : task
            );
            default:
                return state;
        }
    };
            
    const [taskText, setTaskText] = useState("");
    const [tasks, dispatch] = useReducer(taskReducer, [], initialTask)
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(taskText.trim()){
            dispatch({type: "ADD", payload: taskText})
            setTaskText("")
        }
    }

    const removeTask = (id) => {
        dispatch({type: "DELETE", id})
    }

    const handleEditClick = (task) => {
        setIsEditing(true);
        setCurrentTaskId(task.id);
        setEditText(task.text);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()

        if(editText.trim()){
            dispatch({type: "EDIT", payload: { id: currentTaskId, text: editText}});

            setIsEditing(false);
            setCurrentTaskId(null);
            setEditText('')
        }
    }
  return (
    <div className='bg-slate-900 h-screen w-full flex justify-center items-center'>
      <div className="relative group">
         <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div> {/* blur */}
        <div className='relative bg-slate-950 w-500 h-600 p-2 rounded-md'> {/*container */}
            <h1 className='my-2 px-14 text-blue-700 text-lg flex justify-center group-hover:text-blue-300 transition duration-200'>TodoList</h1>
            <div className='flex justify-around w-full'>
                <form onSubmit={handleSubmit} className='flex w-4/5'>
                    <input type="text" 
                    placeholder='Adicionar Tarefa' 
                    className='w-full px-2.5 py-2.5 rounded-md mx-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 border-0 bg-gray-100'
                    onChange={(e) => setTaskText(e.target.value)} value={taskText}
                />
                    <button type="submit" value="Enviar" className='px-2.5 py-2.5 bg-blue-500 hover:bg-blue-700 rounded-md text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300' onClick={handleSubmit}>Adicionar</button>
                </form>
            </div>
            <div className="flex justify-center flex-row my-4">
                <ul className="flex flex-col w-full">
                    {tasks.map((task) => (
                        <li key={task.id} className="bg-gray-400 p-2 m-1 rounded-md flex justify-between items-center">
                            {isEditing && currentTaskId === task.id ? (
                                <form onSubmit={handleEditSubmit} className="flex w-full">
                                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="w-full px-2 py-2 rounded-md mx-2 bg-gray-100" />
                                    <button type="submit" className="bg-green-500 text-white rounded-md p-1 hover:bg-green-700 transition duration-200">
                                        Salvar
                                    </button>
                                </form>
                            ) : (
                                <>
                                    {task.text}
                                    <div className="flex gap-2"> 
                                        <button className="bg-green-500 text-white rounded-md p-1 hover:bg-green-700 transition duration-200" onClick={() => handleEditClick(task)}>Editar</button>
                                        <button className="bg-red-500 text-white rounded-md p-1 hover:bg-red-900 transition duration-200" onClick={() => removeTask(task.id)}>Excluir</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Container

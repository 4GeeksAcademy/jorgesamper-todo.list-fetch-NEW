import React from "react";


// Componente de inicio
const Home = () => {
	// Crear un estado
	// const [estado, setter] = React.useState(estadoInicial)


	const [todoList, setTodoList] = React.useState([])
	const [inputValue, setInputValue] = React.useState("")
	const API_URL = "https://assets.breatheco.de/apis/fake/todos/user/jorgesamper"

	// Función para agregar una nueva tarea a la lista
	const handleAddNewTodo = () => {
		setTodoList(prev => [...prev, { label: inputValue, done: false }])
	}

	// Función para eliminar una tarea de la lista
	const handleDeleteTodo = (indexToRemove) => {
		setTodoList(prev => prev.filter((element, index) => index !== indexToRemove))
	}

	// Función para manejar la pulsación de teclas en el campo de entrada
	const handleOnKeyDown = (e) => {
		const keyPressed = e.key // Obtener la tecla presionada

		
		if (inputValue && keyPressed === "Enter") {
			// Si el campo de entrada no está vacío y se presionó la tecla Enter
			handleAddNewTodo(); // Agregar una nueva tarea
			setInputValue(""); // Limpiar el campo de entrada
		}
	}

	const handleDeleteAll = () => {
		setTodoList([]); // Establecer una lista vacía
	  };


	// Efecto que se ejecuta una vez al cargar el componente
	React.useEffect(() => {
		// Hacer una solicitud a la API para obtener la lista de tareas
		fetch(API_URL)
			.then(promiseResponse => {
				if (promiseResponse.ok)
					return promiseResponse.json().then(data => setTodoList(data))

				// Si no hay ningún usuario creado lo creamos
				const createUserOptions = {
					method: "POST",
					body: JSON.stringify([]),
					headers: { "Content-Type": "application/json" }
				}
				fetch(API_URL, createUserOptions)

			})

	}, [])

	// Efecto que se ejecuta cuando el estado `todoList` cambia
	React.useEffect(() => {

		if (todoList.length > 0) {
			// Si la lista de tareas no está vacía, actualizar la lista en la API
			const udpateTodoOptions = {
				method: "PUT",
				body: JSON.stringify(todoList),
				headers: { "Content-Type": "application/json" }
			}
			fetch(API_URL, udpateTodoOptions)
		}

	}, [todoList])

	// Renderizado del componente
	return (
		<div className="text-center bg-light mx-3 shadow-sm">
			<h1 className="mt-3">TodoList!</h1>
			<hr />
			<input className="border w-100  text-center" placeholder="Write your first task . . ." onKeyDown={handleOnKeyDown} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
			<ul style={{ margin: "1rem" }}>
				{
					todoList.map((singleTodo, index) => {
						return <section key={index} style={{ display: "flex", justifyContent: "space-between" }}>
							<li >{singleTodo.label}</li>
							<button className="btn" onClick={() => handleDeleteTodo(index)}>{`X`}</button>
						</section>
					})
				}
			</ul>
			<span className="fw-bold text-primary" >TOTAL Nº {todoList.length}</span>
			<button className="btn text-danger " onClick={handleDeleteAll} >Delete all</button>
		</div>
	);
};

export default Home;

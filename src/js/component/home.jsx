import React from "react";


//create your first component
const Home = () => {
	// Crear un estado
	// const [estado, setter] = React.useState(estadoInicial)
	const [todoList, setTodoList] = React.useState([{ label: "Elemento 1", done: false }])
	const [inputValue, setInputValue] = React.useState("")
	

	// Añadir nuevo elemento
	const handleAddNewTodo = () => {
		setTodoList(prev => [...prev, { label: inputValue, done: false }])
	}

	// Eliminar elemento
	const handleDeleteTodo = (indexToRemove) => {
		setTodoList(prev => prev.filter((element, index) => index !== indexToRemove))
	}

	// Cuando le damos al enter salta esta función
	const handleOnKeyDown = (e) => {
		// Conseguir que tecla se ha presionado
		const keyPressed = e.key

		// Miramos que inputValue no esté vacío y que la tecla sea el enter
		if (inputValue && keyPressed === "Enter") {
			// Añadimos un nuevo elemento
			handleAddNewTodo()
			// Limpiamos el unput Volvemos a poner input value como vacío
			setInputValue("")
		}
	}

	return (
		<div className="text-center">
			<h1>Todo list</h1>
			<hr />
			<input onKeyDown={handleOnKeyDown} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
			{
				todoList.map((singleTodo, index) => {
					return <ul style={{ margin: "1rem" }}>
						<section style={{ display: "flex", justifyContent: "space-between" }}>
							<li key={index}>{singleTodo.label}</li>
							<button onClick={() => handleDeleteTodo(index)}>{`X ${singleTodo.label}`}</button>
						</section>

					</ul>
				})
				// 
			}
		</div>
	);
};

export default Home;

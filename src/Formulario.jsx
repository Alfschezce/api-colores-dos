import {useState} from 'react'


function Formulario({crearColor}){
	//ahora establecemos los diferentes tipos de estados y le ponemos un valor inicial en el useaState//
	let [valorTexto,setvalorTexto] =useState("")
	let [error,setError] =useState(true)
	let [msgError,setMsgError] =useState("")

    return(

    <form onSubmit ={evento=>{
		
		// Previene el comportamiento por defecto del formulario para que no se envie//
		evento.preventDefault()
		// Establece el estado de error como falso inicialmente
		setError(false)
		// Validación del formato de entrada utilizando una expresión regular
		let valido = /^([0-9]{1,3},){2}[0-9]{1,3}$/.test(valorTexto)

		if(valido){
			// Si la entrada es válida, separa los valores de r, g, b y los convierte en números
			let[r,g,b] = valorTexto.split(",").map(n=>Number(n));

			[r,g,b].forEach(n =>valido= valido && n<=255)
			// Si los valores son válidos, realiza una solicitud POST a la API para crear un color
			if(valido){
			
				return  fetch("https://api-colores-full.onrender.com/colores/nuevo",{
					method : "POST",
					body : JSON.stringify({ r,g,b }),
					headers : {
						"Content-type" : "application/json"
					}
				})
				.then(respuesta => respuesta.json())
				.then(({error,id}) => {
					if(!error){ 
						// Si no hay error, llama a la función 'crearColor' pasando el id y los valores r, g, b
						crearColor({id,r,g,b})
						return setvalorTexto=""
					}
					console.log("..error ");
				});

			}

			setMsgError("deben ser tres numeros entre 0 y 255")
			return setError(true)
		}


		setMsgError("formato invalido")
		setError(true)




	}}>
		<input type="text"
		 placeholder="rrr,ggg,bbb" 
		 value ={valorTexto}
			onChange={evento=>setvalorTexto(evento.target.value)}/>
		
		<p className={`error ${error ? "visible" : ""}`}>{msgError}</p>
		
		<input type="submit" value="crear color"/>
	</form>

    )
}
    


export default Formulario
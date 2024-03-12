import { useState,useEffect } from 'react'
import Formulario from './Formulario.jsx'
import Color from './Color.jsx'

//setColores es la funcion actualizadora del estado colores//

function Colores() {
  
      let [colores,setColores] = useState([])
// para ejecutarse la carga inicial de los datos
    useEffect(()=> {

      fetch("https://api-colores-full.onrender.com/colores")
      .then(respuesta => respuesta.json())
      .then(respuesta =>{
      
              
        setColores(respuesta)//aqui se actualiza
             
      
              
      
      });
        

    },[])


    function crearColor(color){

      setColores([...colores,color])

    }
    function borrarColor(id){

      fetch("https://api-colores-full.onrender.com/colores/borrar/"+id,{

          method:"DELETE"
      })
      .then(respuesta => respuesta.json())
      .then(({resultado}) =>{

        if(resultado == "ok"){

          return setColores(colores.filter(color=>color.id !=id))
        }


        console.log("error en usuario")

      
              
        
             
      
              
      
      });
    }
    

    
    
    
  return (
    <>
      
      <Formulario crearColor={crearColor} />
      <ul>                                  
        {colores.map(({id,r,g,b})=> <Color  key ={id} id={id} r ={r} g= {g} b={b} borrarColor = {borrarColor} />)}
      </ul>
    </>
  )
}

export default Colores

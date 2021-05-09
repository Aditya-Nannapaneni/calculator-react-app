import React, {useState} from 'react';
import './App.css';
import { Input } from 'semantic-ui-react';
import axios from 'axios';



function App() {
  const [text, setValue] = useState("");

  const handleClick = () => {
    if(text!== ""){
      axios.post("https://calculator-flask-app.herokuapp.com/calculate", {"expression": text})
      .then((response) => {
        console.log(response);
        document.getElementsByClassName("sentiment-text")[0].innerText = response['data']['result'];
        
      })
      .catch((err) => {
        console.log(err);
        document.getElementsByClassName("sentiment-text")[0].innerText = "Error!!"
      });
    }
  }


  const handleValueChange = (e) => {
    setValue(e.target.value);
  }
  

  return (
    
    <div style={{height:"100vh", width:"100vw", alignItems:"center", justifyContent:"center", textAlign:"center", backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display:"table-cell", verticalAlign: "middle", horizontalAlign:"middle"}}>
       
        <Input transparent onChange={handleValueChange} action={{color: 'teal', onClick: () => handleClick(), content: "CALCULATE"}} placeholder='Enter...' style={{border:"1px solid #fff", padding:"10px", borderRadius: "5px"}} />
        <p className="sentiment-text" style={{marginTop: "20px", color: "white"}}>Enter Arithmetic Expression</p>
        <ul>
          <p>Instructions!</p>
          <li> Takes mathematical expression in infix notation as input.</li>
          <li> Supports positive, negative, decimal numbers and fractions. </li>
          <li> Supports +  -  *  / operations.</li>
          <li> Supports expressions with multiple levels of nested parentheses.</li>
          <li> Example: (4-2) / 3.5 + 1/(2.5) / 3 </li>
        </ul>
    </div>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


export default App;

// React children is one of the special props all your components have implicitly that along with the react
// composition model, enables a new paradigm of component design. So far you have discovered how to leverage
// this special prop in read mode only, meaning that your components consume it as it is provided. 
// To illustrate, see the Little Lemon restaurant once a way to visualize a summary of live orders as
// they come in from customers. What would be really useful for the chefs working in the kitchen is to
// display each customer order in its own separate row with the name of the dishes, the amount of each dish,
// the total price, the time of submission, and the full name of the customer. Well, by using a set of new react
// APIs that will enhance your component design skills, you will be able to solve this problem for Little Lemon
// with a smart and efficient solution. Let's start by exploring two of these powerful react APIs. 
// React.cloneElement and react.children. In this video, you'll learn how to use both of these react APIs 
// and how they can be used to manipulate the Render Output dynamically. Let's explore the first of these APIs, 
// React.cloneElement in more detail. This is part of the react top-level API and it's used to manipulate and 
// transform elements. Top-level API refers to the way you would import those functions from the react package. 
// You can either import react as a global object and the top of your file and access them as methods on that object. 
// Or alternatively as a named import. Recall that elements are just plain JavaScript objects. The react uses 
// internally to describe what you want to appear on the screen. React.cloneElement effectively clones and 
// returns a new copy of a provided element. The first argument is the react element you would like to clone, 
// and the second argument is the prompts that will be added and merged with the original props passed into the 
// component. Remember that prompts in react are immutable objects. You must create a copy of the element first 
// and perform the transformation in the copy. That's exactly what React.cloneElement allows you to achieve. 
// This API is useful to allow a parent to perform the following operations; modify children properties, add to 
// children properties and extend the functionality of children components. For example you could add another prop 
// dynamically to the submit button element illustrated before. Another important top-level API useful for children 
// manipulation is react.children, which provides utilities for dealing with the props.children data structure. 
// The most important method is the map function. React.children.map is very similar to the map function from arrays 
// and invokes a function in every child contained within its children prop, performing a transformation and returning 
// a new element.

// Note:We can use React. cloneElement() method when a parent component wants to add or 
// modify the props of its children.

import * as React from "react"
import "./App.css"
const Row =({children, spacing})=>{
    const childStyle={
        marginLeft: `${spacing}`
    }


return (
    <div className="Row">
        {React.Children.map(children,(child,index)=>{
            return React.cloneElement(child,{
                style:{
               ...child.props.style,
               ...(index>0?childStyle:{}),
                },
            })
        })}
</div>
)}


export default function LiveOrders(){
    return (
        <div className="App">
            <Row spacing={32}>
                <p>Pizza Margrita</p>
                <p>2</p>
                <p>30$</p>
                <p>18:30</p>
                <p>John</p>
            </Row>
        </div>
    )
}


// another example
// import * as React from "react";

// export const RadioGroup = ({ onChange, selected, children }) => { 
//  const RadioOptions = React.Children.map(children, (child) => { 
//    return React.cloneElement(child, { 
//      onChange, 
//      checked: child.props.value === selected, 
//    }); 
//  }); 
//  return <div className="RadioGroup">{RadioOptions}</div>; 
// }; 
 
// export const RadioOption = ({ value, checked, onChange, children }) => { 
//  return ( 
//    <div className="RadioOption"> 
//      <input 
//        id={value} 
//        type="radio" 
//        name={value} 
//        value={value} 
//        checked={checked} 
//        onChange={(e) => { 
//          onChange(e.target.value); 
//        }} 
//      /> 
//      <label htmlFor={value}>{children}</label> 
//    </div> 
//  ); 
// }; 
// import "./App.css";
// import { RadioGroup, RadioOption } from "./Radio";
// import { useState } from "react";

// function App() {
//   const [selected, setSelected] = useState("");
//   return (
//     <div className="App">
//       <h2>How did you hear about Little Lemon?</h2>
//       <RadioGroup onChange={setSelected} selected={selected}>
//         <RadioOption value="social_media">Social Media</RadioOption>
//         <RadioOption value="friends">Friends</RadioOption>
//         <RadioOption value="advertising">Advertising</RadioOption>
//         <RadioOption value="other">Other</RadioOption>
//       </RadioGroup>
//       <button disabled={!selected}>Submit</button>
//     </div>
//   );
// }

// export default App;

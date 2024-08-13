// Say the Little Lemon Restaurant is looking for a way to keep count of all 
// the items it has on the menu. They would like to display this information in the 
// application so they know when they need to replenish stock and to make it easier 
// for customers to see what is or isn't available at any given time. That information 
// is stored on a server. So we would have to be fetched first prior to displaying it. 
// There are various ways to define the fetching logic like a higher order component. 
// However, render props is also a powerful technique you can leverage to reuse common 
// code.  It's about using a prop called render with a particular attribute 
// that it has to be a function. To be more precise, a component with a render prop 
// takes a function that returns a react element and calls that function inside its 
// render logic. For example a meal provider component could use this pattern if you 
// remember a higher order component enhanced a component by providing new props into 
// it with render props. However the new props are injected dynamically as the parameter 
// of the function. You may already have recognized some similarities between the two. 
// The end goal is the same to enhance components without modifying their original 
// implementation. The way in which they inject those new props or enhancements is 
// what differs to better illustrate this point. That information will need to be fetched from a server that 
// they control and displayed in the application with a single piece of text. The logic 
// for fetching data is one example of a cross cutting concern. I have 
// created a component called data fetcher whose only purpose is to fetch data based on a 
// U. R. L. This is one of its props but it's the second one that should catch your 
// attention and that's the render prop. I'm not fetching real data in this example but I 
// have created a mock if else statement that will return either a list of all desserts or 
// drinks available based on the U. R. L. Path as usual. This fetching logic is a side effect 
// that should be placed inside use effect. Finally let's move to the return statement. 
// This is the unusual part. The component is returning the result of calling the render 
// function and has no other rendering business. This is what makes it very flexible. 
// Data fetcher only has one purpose fetching data and the way they receive it is via 
// the argument in the render function which is the local state used to store the list 
// of desserts or drinks. It's then up to the developers to decide how they would like 
// to present that data on the screen. Finally, let's explore the two presentational components. 
// I have defined to show the number of desserts and drinks available in the menu. 
// The desserts count component uses a particular endpoint to fetch desserts and uses 
// a paragraph element as the render prop, displaying the number of desserts as a single 
// text. The same applies to the drinks count component with the difference being that 
// he utilizes another U. R. L. And instead shows a header element reflecting the number of drinks.

import {useState,useEffect} from "react"

const DataFetcher =({render,url})=>{
    const [data,setData]=useState([])

useEffect(()=>{
    if(url.includes("desserts")){
        setData (["cake","biscuts","pastery"])
    }else{
        setData (["soda","water"])
    }
},[])
return render(data)
}

const DessertCount =()=>{
return (
    <DataFetcher 
    url="https//:littlelemon/desserts"
    render={(data)=><p>{data.length}</p>}/>
)
}

const DrinksCount =()=>{
    <DataFetcher
    url="https://littlelemon/drinks"
    render={(data)=><p>{data.length}</p>}/>

}


export default function App(){
    return(
        <>
        <DessertCount/>
        <DrinksCount/>
        </>
    )
}


// # Instructions

// ## Task

// You've learned about render props and how it's a viable alternative to Higher Order Components to encapsulate cross-cutting concerns.
// In a previous video, you saw a possible implementation of a mouse position tracker using Higher Order Components.
// In this exercise, you'll implement the same specifications but using a render prop component instead.

// **Note:** Before you begin, make sure you understand how to work with the Coursera Code Lab for the [Advanced React course](https://www.coursera.org/learn/advanced-react/supplement/htaLX/working-with-labs-in-this-course).

// ## Steps

// ### **Step 1**

// Open the `App.js` file.

// Complete the implementation of the `MousePosition` component. Specifically, you'll need to:
// - Implement the body of `handleMousePositionChange` inside `useEffect`. Use `e.clientX` and `e.clientY` to get the mouse position from the event object.
// - Implement the return statement of the component.

// ### **Step 2**

// Tweak the implementation of `PanelMouseLogger`. The requirements are:
// - The component should not receive any props.
// - The component should not have any `if` statements.
// - The component should leverage the `MousePosition` `render` prop to show the coordinates in a panel fashion. The panel UI is already provided to you, your goal is to connect the UI with the mouse position data.

// ### **Step 3**

// Tweak the implementation of `PointMouseLogger`. The requirements are:
// - The component should not receive any props.
// - The component should not have any `if` statements.
// - The component should leverage the `MousePosition` `render` prop to show the coordinates in a point representation. The point UI is already provided to you, your goal is to connect the UI with the mouse position data


// import "./App.css";
// import { useEffect, useState } from "react";

// const MousePosition = ({ render }) => {
//   const [mousePosition, setMousePosition] = useState({
//     x: 0,
//     y: 0,
//   });

//   useEffect(() => {
//     const handleMousePositionChange = (e) => {
//       // Use e.clientX and e.clientY to access the mouse position on the screen
//       setMousePosition({
//         x: e.clientX,
//         y:e.clientY
//       })
//     };

//     window.addEventListener("mousemove", handleMousePositionChange);

//     return () => {
//       window.removeEventListener("mousemove", handleMousePositionChange);
//     };
//   }, []);

//   // What should be returned here?
//   return render({mousePosition});
// };

// // This component should not receive any props
// const PanelMouseLogger = () => {
//   // The below if statement can be removed after the render props pattern is implemented
 
//   return (
//     <div className="BasicTracker">
//       <p>Mouse position:</p>
//       <MousePosition render={({ mousePosition }) => (
//            <div className="Row">
//         <span>x: {mousePosition.x}</span>
//         <span>y: {mousePosition.y}</span>
//       </div>
//       )} />
   
//     </div>
//   );
// };

// // This component should not receive any props
// const PointMouseLogger = ({mousePosition}) => {
//   // The below if statement can be removed after the render props pattern is implemented
//   return (
//     <MousePosition render={({mousePosition})=>(
//  <p>
//       ({mousePosition.x}, {mousePosition.y})
//     </p>
//     )}/>
   
//   )
// };

// function App() {
//   return (
//     <div className="App">
//       <header className="Header">Little Lemon Restaurant 🍕</header>
//       <PanelMouseLogger />
//       <PointMouseLogger />
//     </div>
//   );
// }

// export default App;









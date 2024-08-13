
// In a previous lesson, you learned about Higher-order components (HOC) as a pattern to abstract shared behavior,
// as well as a basic example of an implementation.

// Let's dive deeper to illustrate some of the best practices and caveats regarding HOCs.

// These include never mutating a component inside a HOC, passing unrelated props to your wrapped component,
// and maximizing composability by leveraging the Component => Component signature.

// Don’t mutate the original component

// One of the possible temptations is to modify the component that is provided as an argument, or in other words,
// mutate it. That's because JavaScript allows you to perform such operations, and in some cases, it seems the most 
// straightforward and quickest path. Remember that React promotes immutability in all scenarios. So instead,
// use composition and turn the HOC into a pure function that does not alter the argument it receives, always
// returning a new component.

// const HOC = (WrappedComponent) => {
//   // Don't do this and mutate the original component
//   WrappedComponent = () => {
    
//   }; 
//  …
// }
// Pass unrelated props through to the Wrapped Component

// HOC adds features to a component. In other words, it enhances it. That's why they shouldn't drastically 
// alter their original contract. Instead, the component returned from a HOC is expected to have a similar 
// interface to the wrapped component.

// HOCs should spread and pass through all the props that are unrelated to their specific concern,
// helping ensure that HOCs are as flexible and reusable as possible, as demonstrated in the example below:


// const withMousePosition = (WrappedComponent) => {
//   const injectedProp = {mousePosition: {x: 10, y: 10}};

//   return (originalProps) => {
//     return <WrappedComponent injectedProp={injectedProp} {...originalProps} />;
//   };
// };
// Maximize composability

// So far, you have learned that the primary signature of a HOC is a function that accepts a React component and
// returns a new component.

// Sometimes, HOCs can accept additional arguments that act as extra configuration determining the type of enhancement 
// the component receives.


// const EnhancedComponent = HOC(WrappedComponent, config)
// The most common signature for HOCs uses a functional programming pattern called "currying" to maximize function
// composition. This signature is used extensively in React libraries, such as 
// React Redux
// , which is a popular library for managing state in React applications. 


// const EnhancedComponent = connect(selector, actions)(WrappedComponent);
// This syntax may seem strange initially, but if you break down what's happening separately, it would be 
// easier to understand.


// const HOC = connect(selector, actions);
// const EnhancedComponent = HOC(WrappedComponent);
// connect is a function that returns a higher-order component, presenting a valuable property for composing 
// several HOCs together.

// Single-argument HOCs like the ones you have explored so far, or the one returned by the connect function 
// the signature Component => Component. It turns out that functions whose output type is the same as its input
// type are really easy to compose together.


// const enhance = compose(
//   // These are both single-argument HOCs
//   withMousePosition,
//   withURLLocation,
//   connect(selector)
// );

// // Enhance is a HOC
// const EnhancedComponent = enhance(WrappedComponent);
// Many third-party libraries already provide an implementation of the compose utility function, like 
// lodash
// , 
// Redux
// , and 
// Ramda
// . Its signature is as follows:

// compose(f, g, h) is the same as (...args) => f(g(h(...args)))

// Caveats

// Higher-order components come with a few caveats that aren’t immediately obvious.

// Don't use HOCs inside other components: always create your enhanced components outside any component scope.
// Otherwise, if you do so inside the body of other components and a re-render occurs, the enhanced component
// will be different. That forces React to remount it instead of just updating it. As a result, the component 
// and its children would lose their previous state. 


// const Component = (props) => {
//   // This is wrong. Never do this
//   const EnhancedComponent = HOC(WrappedComponent);
//   return <EnhancedComponent />;
// };

// // This is the correct way
// const EnhancedComponent = HOC(WrappedComponent);
// const Component = (props) => {
//   return <EnhancedComponent />;

// Refs aren’t passed through: since React refs are not props, they are handled specially by React.
// If you add a ref to an element whose component is the result of a HOC, the ref refers to an instance
// of the outermost container component, not the wrapped component. To solve this, you can use the 
// React.forwardRef API
// . You can learn more about this API and its use cases in the additional resources section from this lesson.

// Conclusion

// And in summary, you have examined higher-order components in more detail. The main takeaways are never 
// mutating a component inside a HOC and passing unrelated props to your wrapped component. 

// You also learned how to maximize composability by leveraging the Component => Component signature and addressed 
// some caveats about HOC.

// Example of HOC:
// =====================
// ======================
// ==========================

// HOC to track cursor position
// presenting data using presentational component 


const PanelMouseLogger =({mousePosition})=>{
    if(!mousePosition){
        return null
    }
    return (
        <div className="BasicTracker">
            <p>Mouse position:</p>
            <div className="Row">
                <span>x: {mousePosition.x}</span>
                <span>y:{mousePosition.y}</span>
            </div>
        
        </div>
    )
}


const PointMouseLogger=({mousePosition})=>{
   if(!mousePosition){
    return null
   }
   return(
    <p>
        ({mousePosition.x},{mousePosition.y})
    </p>
   )
}
// They both expect a mouse position prop and will 
// return null if that prop is not provided. 
// That's why at the moment they don't render 
// anything at all. You could implement the mouse
//  tracking logic in each component but recall that
//  it would incur code repetition and duplication
//  of the same logic in two different places. That's
//  why the recommended approach is to use one of the 
// techniques that React provides for encapsulating cross-cutting concerns

// ================================================================================
// Finally, the last step to complete the implementation is to set a new prop
//  called mouse position in the rapt component to pass that information down
//  to all components that are interested in that data. Great. Now, that the 
// implementation of the HOC is finished, let's add the last few pieces to display
//  the mouse position on the screen. To enhance the two components previously defined
//  panel mouse logger and point mouse logger, I will use the HOC to create two new component 
// versions that will be aware of the mouse position data and I'll call them panel mouse tracker
//  and point mouse tracker respectively. Finally, I will use the enhanced versions in the 
// rendering part of the app component. Amazing. The requirements are now finalized. If I move
//  the cursor around the screen, you can see two different trackers that display the same 
// information in different ways. One as a panel and the one below as a data point.

const PanelMouseTracker = withMousePosition(PanelMouseLogger)
const PointMouseTracker =withMousePosition(PointMouseLogger)

function App(){
    return (
        <div className="App">
            <header className="Header">Little Lemon</header>
            {/* Now use enhanced version here */}
        <PanelMouseTracker/>
        <PointMouseTracker/>
        </div>
    )
}

// How to do this with an HOC. I call this HOC with mouse position. 
// The with part of the name is a general convention recommended by
//  React since it expresses the enhancing nature of the technique, 
// like providing a component with something else.




// HOC

const withMousePosition=(WrappedComponent)=>{
    // HOC is essentially a function that takes a component and returns
    //  a new component. Let's complete the initial scaffold and return 
    // a component that will render the wrapped component provided to the
    //  function without forgetting to spread the props it receives, so
    //  that they will pass-through. Great. Now to track the position of 
    // the cursor, I would need to define a new piece of local state, which 
    // I'll call mouse position for the data and set mouse position for the state setter. 
    // The initial state will be an object with two properties, x and y to define the
    //  two-dimensional coordinates on the screen and I will set both to zero.
    //  X equals 0 and y equals 0, represents the top-left corner of the screen. 
    return (props)=>{
        const [mousePosition, setMousePosition] =React.useState({
            x:0,
            y:0
        })
        // Next, I would need to set a global listener in the window object for the
        //  mouse move events. Since this is a side-effect, I need to perform the subscription
        //  and unsubscription logic inside use effects. Let's go ahead and do that,
        //  I will add a new event listener for a mouse movement to the window object. 
        // For the call back, I will name the function handleMousePositionChange. 
        // That for now, doesn't do anything. It's important to remove any subscription when
        //  your component unmounts. The way to do that is by returning a function from use 
        // effect and then performing any cleanup needed. In this case, I would have to use
        //  the window.removeEventListener passing as arguments, the mouse move event and the
        //  same callback function as before. To complete the logic and set the state with
        //  current mouse position, I need to read that information from the browser event object,
        //  which is passed as an argument to the callback. That event object contains two properties
        //  that define the coordinates, clients X and client Y. I will assign both of them to the corresponding dimension.
        React.useEffect(()=>{
            const handleMOusePosition=(e)=>{
            setMousePosition({
                x:e.clientX,
                y:e.clientY
            })
            }
            window.addEventListener("mousemove", handleMOusePosition)
            // cleanup
            return(()=>{
                window.removeEventListener("mousemove",handleMOusePosition)
            })
        },[])
        return <WrappedComponent {...props}/>
    }
}
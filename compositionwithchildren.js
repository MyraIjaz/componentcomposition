// There are two main features that enable component composition; containment and specialization. Let's break down these two main features now starting
// with containment. Containment refers to the fact that some components don't know their children ahead 
// of time. This is especially common for components like a sidebar or a dialog, where they delimit a 
// specific area in your UI to contain other elements. You can think of them also as generic boxes. 
// In case you don't know, a dialog is a type of modal window where the rest of the UI is disabled
// until the modal is addressed and interacted with. For these component boxes, the recommended 
// approach is to use the children prop to pass children elements directly as their content.
// Let's explore this with a dialog example. Here you have a dialog component which acts as the box,
// taking care of styling the container to make it look like a modal window. By using the children prop,
// it has become a generic component to which we can provide any valid JSX as children. 
// To illustrate that, the confirmation dialog component has been defined, which uses the dialog
// component and renders as children a title and a description. This example also showcases the second
// feature of component composition, specialization. Specialization defines components as being special
// cases of other components. In this example, the confirmation dialog is a special case of dialog.
// Now that you are familiar with the basics of component composition, let's go ahead and code an
// application to demonstrate what you've learned. This application has been created with Create React app.
// Imagine Little Lemon would like to offer an easy way for their users to delete their account if they 
// want to, the goal is to build a generic dialog component that will contain a title, a description,
// and a warning button to make sure users are aware of the action's consequences all using component 
// composition. I have already created two generic components, a button and an alert. The button uses
// the children prop to specify its text, and the alert is a generic box that renders an overlay in the
// background and a white modal in the center of the screen. The children prop determines the content of
// that modal. The first step is to create a warning button using the specialization feature of component
// composition. For that, I'll define a new component named delete button, where I'll render the button 
// component and configure its properties to have a red color and the text delete. Then I'll go ahead 
// and render the alert component.
// As it stands, it's just a generic white box or container. This illustrates the second feature of
// component composition which is containment. I can customize the content of the box in any way I
// would like by just providing JSX as its children. To fulfill the requirements of Little Lemon,
// I'll create a header titled delete account, as well as a paragraph to inform the user about the action.
// I want to state clearly that they will miss out on the chef's delicious recipes if they delete their
// account, so I'll reflect that in the description. Finally, the last piece is to render the delete button
// as defined previously. That wraps it up.
import "./App.css"

// 2 generic components Button and ALert
const Button =({children, backgorundColor})=>{
    return <button style={{backgorundColor}}>{children}</button>
}

const Alert =({children})=>{
    return (
        <>
        <div className="Overlay"/>
        <div className="Alert">{children}</div>
        </>
    )
}
const DeleteButton =()=>{
    return <Button backgorundColor="red">Delete</Button>
}

export default function App(){
    return (
        <div className="App">
            <header>Little Lemon Resturant</header>
            <Alert>
                
            </Alert>
        </div>
    )
}
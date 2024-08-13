import * as React from "react";


export const RadioGroup = ({ onChange, selected, children }) => {
 
  const RadioOptions = React.Children.map(children,(child,index)=>{
    return React.cloneElement(child,{
       onChange,
       checked: child.props.value ===selected,
    })
  })

  return <div className="RadioGroup">{RadioOptions}</div>;
};

export const RadioOption = ({ value, checked, onChange, children }) => {
  // Hook up the onChange handler to call the onChange prop passed to RadioGroup
  // Also, make sure to pass the correct checked prop to the input element
  return (
    <div className="RadioOption">
      <input
       id={value}
        type="radio" 
        name={value} 
        value={value}
        checked={checked}
        onChange={(e)=>{
          onChange(e.target.value)
        }}
        />
      <label htmlFor={value}>{children}</label>
    </div>
  );
};

import React from "react";
//Simple example for arrow function
// const Fun1 = () => {
//     return <text>Hi am a text element</text>
// }
//export default Fun1;

//Simple example for arrow function with a variable
// const Fun1 = () => {
//     const name="indu"
//     return <text>Hi am {name}</text>
// }
//export default Fun1;

//Simple example for arrow function with a variable & parameters
// const Getfullname = (
//     firstname:String,
//     lastname:String,
// ) => {
// return firstname + '' + lastname;
// }
// const Fun1 = () => {
//     return <text>Hi am {Getfullname("indu","murthy")}</text>
// }
// export default Fun1;

//Simple example for props
type User = {
  name: String;
};

const Funs = (props: User) => {
  return <text>Hi am {props.name}</text>;
};

const Func = () => {
  return (
    <>
      <Funs name="indu" />
      <Funs name="bindu" />
    </>
  );
};

export default Func;

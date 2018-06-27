// import React from 'react'

// class AddButton extends React.Component{
//     constructor(props){
//         super(props);
//         this.add = this.add.bind(this);
//     }

//     add() {
//         console.log("clicked!");
//     }

//     render(){
//         return(
//             React.createElement("button",
//             {className: "btn btn-primary btn-block",
//             id: "add-btn",
//             onClick: this.add},
//             "Add Recipe")
//         );
//     }
// }

// class App extends React.Component {
//     render(){
//         // var args = [];
//         // args.push("div");
//         // args.push({className: "row"});
//         // args.push(React.createElement(AddButton,{}));
//         // return(
//         //     // React.createElement("div",{className: "row"}),
//         //     // React.createElement(AddButton,{})
//         //     React.createElement.apply(null,args)
//         // );
//         return(
//             <p>Hello</p>
//         );
//     }
// }

// var container = document.getElementById("react-container");
// ReactDOM.render(React.createElement(App), container);
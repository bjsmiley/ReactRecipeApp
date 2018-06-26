// import React from 'react'

class App extends React.Component {
    render(){
        return(
            React.createElement("h1",{id: "id1", className: "class1"},"Recipes")
        );
    }
}

var container = document.getElementById("react-container");
ReactDOM.render(React.createElement(App), container);
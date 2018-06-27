class RecipeList extends React.Component{
  render(){
    return(
      <div>LIST GOES HERE</div>
    );
  }
}

class AddButton extends React.Component{
  constructor(props){
    super(props);
    this.add = this.add.bind(this);
  }

  add() {
    console.log("clicked!");
  }

  render(){
    return(
      <div className="row">
        <button className="btn btn-primary btn-block" onClick={this.add}>
          Add Recipes
        </button>
      </div>
    );
  }
}

class Recipes extends React.Component{
  render(){
    return(
      <div className="container">
        <AddButton/>
        <RecipeList/>
      </div>
    );
  }
}

var container = document.getElementById("react-container");
ReactDOM.render(
  <Recipes/>,
  container
);
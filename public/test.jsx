class Recipe extends React.Component{
  // constructor(props){
  //   super(props);
  //   //this.state = {title: props.title, ingredients: props.ingredients, directions: props.directions};
  // }

  render(){
    return(
      <div className="row">
        <div id={this.props.id}>{this.props.title}</div>
        <button className="btn btn-secondary">carot</button>
      </div>
    );
  }
}

class RecipeList extends React.Component{
  constructor(props){
    super(props);
    this.state = {list: []};

    var oReq = new XMLHttpRequest();
    var url = "query?getRecipes"
    oReq.open("GET", url);
    oReq.addEventListener("load", ()=> {callback(this);} );
    oReq.send();

    function callback(self){
      var response = JSON.parse(oReq.responseText);
      self.setState({list: response});
    }
  }
  render(){

    var _list; 
    var map;

    if( this.state.list.length > 0 ){
      _list = this.state.list;
      map = _list.map( function (value,index){return <Recipe key={value.id} id={"recipe-"+index} title={value.name}/> });
    }
    else{
      map = (<div>Loading...</div>);
    }

    return(
      map
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

class RecipeApp extends React.Component{
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
  <RecipeApp/>,
  container
);
class Recipe extends React.Component{
  // constructor(props){
  //   super(props);
  //   //this.state = {title: props.title, ingredients: props.ingredients, directions: props.directions};
  // }

  render(){
    return(
      <div className="row">
        <Well>
          <div id={this.props.id}>{this.props.title}</div>
          <button className="btn btn-sm btn-secondary">carot</button>
        </Well>
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

    this.state = {
      show: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.add = this.add.bind(this);

  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    console.log("clicked!!");
    this.setState({ show: true });
  }

  add() {
    console.log("add!");
  }

  

  render(){
    return(
      <div className="row">
        {/* <button className="btn btn-primary btn-block" onClick={this.add}>
          Add Recipes
        </button> */}
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow} block>
          Add Recipes
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Add A Recipe</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>...</p>
          </Modal.Body>

          <Modal.Footer>
          <Button onClick={this.add}>Add</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
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
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Well = ReactBootstrap.Well;
// var Button = <ReactBootstrap className="Button"></ReactBootstrap>

ReactDOM.render(
  <RecipeApp/>,
  container
);
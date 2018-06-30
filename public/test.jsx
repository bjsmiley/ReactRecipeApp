var globalRecipes = [];

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class AddForm extends React.Component{
  
  render(){
    return(
      <form id="add-form">
        <FieldGroup
        id="formControlsName"
        type="text"
        label="Name"
        placeholder="Enter name of recipe"
        />
        <FieldGroup
        id="formControlsIngredients"
        type="text"
        label="Ingredients"
        placeholder="Enter list of ingredients"
        />
        <FieldGroup
        id="formControlsDirections"
        type="text"
        label="Directions"
        placeholder="Enter directions"
        />
      </form>
    );
  }
}

class Recipe extends React.Component{
  render(){
    return(
      <Row>
        <Col md={8} mdOffset={2}>
          <Well>
            <div id={"title-"+this.props.id}>{this.props.title}</div>
            <button className="btn btn-sm btn-secondary">carot</button>
          </Well>
        </Col>
      </Row>
    );
  }
}

class RecipeList extends React.Component{
  render(){

    var _list; 
    var map;

    if( this.props.list.length > 0 ){
      _list = this.props.list;
      map = _list.map( function (value){return <Recipe key={value.id} id={"recipe-"+value.id} title={value.name}/> });
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
    this.close = this.close.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  close(){
    this.props.add();
    this.setState({ show: false });
  }

  render(){
    return(
      <Row>
        <Col md={8} mdOffset={2}>
          <Button id="add-btn" bsStyle="primary" bsSize="large" onClick={this.handleShow} block>
            Add Recipes
          </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>

            <Modal.Header closeButton>
              <Modal.Title>Add A Recipe</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <AddForm/>
            </Modal.Body>

            <Modal.Footer>
            <Button onClick={this.close}>Add</Button>
              <Button onClick={this.handleClose}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    );
  }
}

class RecipeApp extends React.Component{
  constructor(props){

    super(props);
    this.state = {list: []};
    this.add = this.add.bind(this);

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

  add(){
    var name = document.getElementById("formControlsName").value;
    var ingredients = document.getElementById("formControlsIngredients").value;
    var directions = document.getElementById("formControlsDirections").value;
    var oReq = new XMLHttpRequest();
    var url = "query?add="+name+"+"+ingredients+"+"+directions;

    oReq.open("GET", url);
    oReq.addEventListener("load", ()=> {callbackAdd(this);} );
    oReq.send();

    function callbackAdd(self){
      var oReq2 = new XMLHttpRequest();
      var url2 = "query?getRecipes";
      oReq2.open("GET", url2);
      oReq2.addEventListener("load", ()=> {callback2(self);} );
      oReq2.send();

      function callback2(self){
        var response = JSON.parse(oReq2.responseText);
        self.setState({list: response});
      }
    }
  }

  render(){
    return(
      <div className="container">
        <AddButton add={this.add}/>
        <RecipeList list={this.state.list}/>
      </div>
    );
  }
}

var container = document.getElementById("react-container");
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Well = ReactBootstrap.Well;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;

ReactDOM.render(
  <RecipeApp/>,
  container
);
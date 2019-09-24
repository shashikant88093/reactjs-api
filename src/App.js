import React from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      bol:false,
      data: [],
      Category:"",
      Item:"",
      Price:"",
      Qty:""
    };
  }
  componentDidMount() {
    Axios.get("http://5d11afb884e9060014576447.mockapi.io/axios").then(
      res => {
        this.setState({ data: res.data });
      }
    );
  }
  AddHandler = e => {
    e.preventDefault();
    if (
      this.refs.Item.value.length == 0 ||
      this.refs.Qty.value.length == 0 ||
      this.refs.Price.value.length == 0
    ) {
      alert("Please fill all in the form..");
    } 
    else if(this.state.bol){
      const user={
        id:this.state.id,
        Category:this.state.Category,
        Item:this.state.Item,
        Price:this.state.Price,
        Qty:this.state.Qty
      }
     this.state.data[this.state.id-1]=user;
     this.setState({
       data:this.state.data
     })
     
      Axios.put(`"http://5d11afb884e9060014576447.mockapi.io/axios"/${this.state.id}`, user)
      this.setState({
        id:0,
        Category:"",
        Item:"",
        Price:"",
        Qty:"",
      })
      this.Cleaner();
    }
    else {
      const user = {
        id:this.state.data.length+1,
        Category: this.refs.Category.value,
        Item: this.refs.Item.value,
        Qty: this.refs.Qty.value,
        Price: this.refs.Price.value
      };
      let adder = [...this.state.data, user];
      this.setState({
        data: adder
      });
      Axios.post(`"http://5d11afb884e9060014576447.mockapi.io/axios"`, user);
      this.Cleaner();
    }
  };
  Cleaner = () => {
    this.refs.Item.value = "";
    this.refs.Qty.value = "";
    this.refs.Price.value = "";
    this.refs.Category.value = "";
  };
  EditHandler = e => {
    this.setState({
      id:e.id,
      Category:e.Category,
      Item:e.Item,
      Price:e.Price,
      Qty:e.Qty,
      bol:true,
     
    })

  };
  DeleteHandler = e => {
    Axios.delete(`"http://5d11afb884e9060014576447.mockapi.io/axios"${e}`);
    let deleted = this.state.data.filter(d => d.id != e);
    this.setState({
      data: deleted
    });
  };
  EventCat=(e)=>{
    this.setState
    ({
      Category:e.target.value
    })
  }
  EventItem=(e)=>{
    this.setState({
      Item:e.target.value
    })
  }
  EventPrice=(e)=>{
    this.setState({
      Price:e.target.value
    })
  }
  EventQty=(e)=>{
    this.setState({
      Qty:e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <form  >
          <fieldset className="border p-2">
            <legend className="w-auto">
              Form <span style={{ color: "red" }}>Integra</span>
            </legend>
            <div class="form-row">
              <div class="form-group col-md-6" style={{ marginTop: "2rem" }}>
                <label>Categories</label>
                <select
                  style={{
                    borderRadius: "11px",
                    width: "20rem",
                    height: "2.5rem",
                    marginLeft: "1rem"
                  }}
                  ref="Category"
                  value={this.state.Category}
                  onChange={this.EventCat}
                >
                  <option value="Home Appliances">Home Appliances</option>
                  <option value="Kids Wear">Kids Wear</option>
                  <option selected value="Electronics">
                    Electronics
                  </option>
                  <option value="Furnitures">Furnitures</option>
                  <option value="Books">Books</option>
                </select>{" "}
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Item</label>
                <input
                  class="form-control"
                  placeholder="Enter the Item name.."
                  ref="Item"
                  value={this.state.Item}
                  onChange={this.EventItem}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-sm-6 form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={this.state.Qty}
                  class="form-control"
                  ref="Qty"
                  onChange={this.EventQty}
                />
              </div>
              <div className="col-sm-6 form-group">
                <label for="inputAddress2">Price</label>
                <input
                  type="number"
                  value={this.state.Price}
                  class="form-control"
                  ref="Price"
                  onChange={this.EventPrice}
                />
              </div>
            </div>
            <button class="btn btn-primary" onClick={this.AddHandler}>
              ADD
            </button>
          </fieldset>
        </form>
        <div className="row">
          <div className="col-md-12">
            <table class="table table-striped form">
              <thead>
                <tr>
                  <th scope="col">S.NO</th>
                  <th scope="col">Category</th>
                  <th scope="col">Item</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(items => {
                  return (
                    <tr>
                      <th scope="row">{items.id}</th>
                      <td>{items.Category}</td>
                      <td>{items.Item}</td>
                      <td>{items.Qty}</td>
                      <td>{items.Price}</td>
                      <td>
                        <div className="row">
                          <button
                            className="btn btn-warning"
                            onClick={this.EditHandler.bind(this, items)}
                          >
                            Edit it
                          </button>
                          <button
                            className="btn btn-danger"
                            style={{ marginLeft: "1rem" }}
                            onClick={this.DeleteHandler.bind(this, items.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
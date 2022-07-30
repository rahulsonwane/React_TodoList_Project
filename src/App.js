import React, {Component} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Plan from './Plan'
import axios from 'axios'


// Axios instance
const ai = axios.create({
  baseURL : 'http://127.0.0.1:8000/api'
})
class App extends Component {
  state = {
    items : [],
    text : ""
  }

  showPlan  = () => {
    ai.get('/list/')
    .then((res) => {
      // console.log(res.data)
      this.setState({items : res.data})
    })
  }

  handleChange = e => {
    this.setState({ text:e.target.value})
  }


  addPlan = (d) => {
    if(this.state.text !== ""){
      ai.post('/create/',d)
      .then((res) => {
        this.setState({text: ''})
        this.showPlan()
      })
    }
  }
  handleAdd = e => {
    let dt = {item : this.state.text}
    this.addPlan(dt)
  }
  

  handleDelete = id => {
    console.log('Deleted', id)
    ai.delete(`/destroy/${id}`)
    .then((res) => {
      this.showPlan()
    })
  }

componentDidMount(){
    this.showPlan();
  }
  render() {
    return (
      <div className='container-fluid my-5 '>
        <div className="row">
          <div className="col-sm-6 mx-auto text-white shadow-lg p-3">
            <h1 className='text-center'>Today's Plan </h1>
            <div className="row">
              <div className="col-9">
                <input type="text" className='form-control' placeholder='Write Plan Here' value={this.state.text}  onChange={this.handleChange} />
              </div>

              <div className="col-2">
                <button className="btn btn-warning px-5 font-weight-bold" onClick={this.handleAdd}>Add</button>
              </div>

              <div className="container-fluid">
                <ul className="list-unstyled row m-5 "> 
                {console.log("State Items", this.state.items)}
                  {
                    this.state.items.map((value, i) => {
                      return <Plan  key={i} id={value.id} value={value.item}
                      sendData={this.handleDelete}
                      />
                    })
                  }
                  
                </ul>

                {/* <ul className='list-unstyled row m-5' >
                  <Plan p={this.state.items} sendData={this.handleDelete} />
                </ul> */}
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default App;

import React,{Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import 'tachyons';
import Signin from './components/Signin/Signin';
import Register from './components/Signin/Register';
import Footer from './components/Footer/Footer';


const particlesOptions = {
  "particles": {
    "number": {
        "value": 100
    },
    "size": {
        "value": 5
    }
},
"interactivity": {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        }
    }
}
}

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageurl: '',
      box: [] ,
      apiResponse: {} ,
      imageactive: false ,
      route: 'signin',
      ScrollHeight:Number(window.innerHeight)-146,
      user:{
        id:"",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  loaduser = (data) => {
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  setScrollWH= () => {
    var height=Number(window.innerHeight)
    this.setState({ScrollHeight:height-146})
    if (this.state.imageactive===true){
      this.setState({box:this.createFaceArray(this.state.apiResponse)})
    }
  }
  
  createFaceArray = (data) => {
      const box = []
      const im=document.getElementById('inputimage')
      const width=Number(im.width);
      const height=Number(im.height);
      const faceset = data;
      faceset.forEach(element => {
        var face=element.region_info.bounding_box;
        box.push([face.top_row *height ,width - (face.right_col * width),(face.right_col-face.left_col)*width,(face.bottom_row-face.top_row)*height])
      });
      return box
  }
  
  displayFrame = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value });
  }
  
  onButtonSubmit = (event) => {
    this.setState({box:[]})
    this.setState({imageurl:this.state.input});
    fetch('https://enigmatic-springs-50917.herokuapp.com/imageapi',{
      method:'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        imageurl:this.state.input,
      })
    }).then(response => response.json())
      .then(respon => {
        if (respon.status==="success"){
          fetch('https://enigmatic-springs-50917.herokuapp.com/image',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id,
            })
          }).then(response => response.json())
            .then(data => {
              if (data.status === 'success'){
                this.setState({user:{
                  id:this.state.user.id,
                  name:this.state.user.name,
                  email:this.state.user.email,
                  entries:data.data,
                  joined:this.state.user.joined
                }})
              }
            })
            .catch(err => console.log(err));
          this.setState({apiResponse:respon.data})
          this.setState({imageactive:true})
          this.displayFrame(this.createFaceArray(respon.data))
        }
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (stat)=> {
    this.setState({box:[]})
    this.setState({imageurl:''})
    this.setState({route:stat})
  }

  componentDidMount() {
    this.setScrollWH();
    window.addEventListener("resize", this.setScrollWH.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.setScrollWH.bind(this));
  }

  render() {

    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation route={this.state.route} onRouteChange={this.onRouteChange} />
        <div className="Scroll" style={{overflowY : 'scroll',height:this.state.ScrollHeight+'px'}}>
        { this.state.route==='signin' ?
          <Signin loaduser={this.loaduser} onRouteChange={this.onRouteChange} />
          : 
          ( 
            this.state.route==='register'?
            <Register loaduser={this.loaduser} onRouteChange={this.onRouteChange} />
            :
            <div style={{marginBottom:'200px'}}>
              <Rank user={this.state.user} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageurl={this.state.imageurl} />
            </div>
          )
        }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

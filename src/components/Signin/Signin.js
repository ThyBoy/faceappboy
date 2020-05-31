import React from 'react';
import './style.css';
import signin_image from './images/signin-image.jpg';

class Signin extends React.Component{
  constructor(props){
    super();
    this.state = {
      signInName: "",
      signInPassword: "",
      inType: true,
      timeOut: false,
    }
  }

  typeChange = () => {
    this.setState({inType:!this.state.inType})
  }
  
  popError = () => {
    this.setState({timeOut:!this.state.timeOut});
    setTimeout(()=>{this.setState({timeOut:!this.state.timeOut});},2000);
  }

  onNameChange = (event) => {
    this.setState({signInName: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword:event.target.value})
  }

  onSubmitSignin = () => {
    fetch('https://enigmatic-springs-50917.herokuapp.com/signin',{
      method:'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.signInName,
        password:this.state.signInPassword
      })
    }).then(response => response.json())
      .then(data => {
        if (data.status === 'success'){
          this.props.onRouteChange('home');
          this.props.loaduser(data.data);
        }else{
          this.popError();
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className='sinin'>
        <section className="sign-in">
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                  <figure><img alt="signin_image" src={signin_image} /></figure>
              </div>

              <div className="signin-form">
                <h2 className="form-title">Sign In</h2>
                <div className="register-form">
                  <div className="form-group">
                      <label htmlFor="your_name"><i className="zmdi material-icons-name"></i></label>
                      <input type="text" name="your_name" id="your_name" placeholder="Email Id"
                        onChange={this.onNameChange}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="your_pass"><i className="zmdi"></i></label>
                      <input type={this.state.inType? "password":"text"} name="your_pass" id="your_pass" placeholder="Password"
                        onChange={this.onPasswordChange}
                        autoComplete='off'
                      />
                  </div>
                  <p style={{display:"flex",justifyContent: "center",marginTop: "5px",fontSize:"0.7rem",marginBottom:"10px"}}><input className="w3-check" type="checkbox"
                      onClick={this.typeChange}
                      /> Show Password </p>
                  {this.state.timeOut?
                  <p style={{padding:'0px',margin:'0px',fontSize:"0.7rem",color:"red"}}>User not found</p>:
                  <p style={{margin:"0px",padding:"10px"}}></p>
                  }
                  <div className="form-group form-button">
                      <input type="submit"
                      onClick={this.onSubmitSignin} id="signin" className="form-submit" value="Log in"/>
                  </div>
                </div>
                <div>
                  <p onClick={() => onRouteChange('register')} className="signup-image-link">Create an account</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Signin;
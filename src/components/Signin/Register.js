import React from 'react';
import './style.css';
import signup_image from './images/signup-image.jpg';

class Register extends React.Component{
  constructor(props){
    super();
    this.state={
      name:"",
      email:"",
      password:"",
      repassword:"",
      inType: true,
      match:false,
      popError: false
    }
  }

  typeChange = () => {
    this.setState({inType:!this.state.inType})
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email:event.target.value})
  }

  onPasswordChange = (event) => {
    if(event.target.value!==this.state.repassword){
      this.setState({match:true})
    }else{
      this.setState({match:false})
    }
    this.setState({password:event.target.value})
  }

  onRepasswordChange = (event) => {
    if(event.target.value!==this.state.password){
      this.setState({match:true})
    }else{
      this.setState({match:false})
    }
    this.setState({repassword:event.target.value});
  }

  onSubmitSignup = () => {
    if ((this.state.password===this.state.repassword) & (this.state.password.length>1) & (this.state.name.length>1) & (this.state.email.length>1)){
      fetch('http://localhost:3000/register',{
        method:'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          name:this.state.name,
          password:this.state.password,
          email: this.state.email
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
    else{
      this.popError();
    }
  }

  popError = () => {
    this.setState({timeOut:!this.state.timeOut});
    setTimeout(()=>{this.setState({timeOut:!this.state.timeOut});},2000);
  }

  render(){
    return (
      <div className="sinreg">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <div className="register-form" id="register-form">
                  <div className="form-group">
                      <label htmlFor="name"><i className="zmdi material-icons-name"></i></label>
                      <input type="text" name="name" id="name" placeholder="Your Name"
                        onChange={this.onNameChange}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="email"><i className="zmdi"></i></label>
                      <input type="email" name="email" id="email" placeholder="Your Email"
                        onChange={this.onEmailChange}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="pass"><i className="zmdi"></i></label>
                      <input type={this.state.inType? "password":"text"} name="pass" id="pass" placeholder="Password"
                        onChange={this.onPasswordChange}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="re-pass"><i className="zmdi"></i></label>
                      <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"
                        onChange={this.onRepasswordChange}
                      />
                      {this.state.match?
                        <p style={{padding:'0px',margin:'0px',fontSize:"0.7rem",color:"red"}}>Passwords don't match</p>:
                        <p style={{margin:"0px",padding:"10px"}}></p>
                      }
                      {this.state.timeOut?
                        <p style={{padding:'0px',margin:'0px',fontSize:"0.7rem",color:"red"}}>Error while signing up. Try again.</p>:
                        <p style={{margin:"0px",padding:"10px"}}></p>
                      }
                  </div>
                  <p style={{display:"flex",justifyContent: "center",marginTop: "5px",fontSize:"0.7rem",marginBottom:"10px"}}><input className="w3-check" type="checkbox"
                      onClick={this.typeChange}
                      /> Show Password </p>
                  <div className="form-group form-button">
                      <input onClick={this.onSubmitSignup} type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                  </div>
                </div>
              </div>
              <div className="signup-image">
                  <figure style={{marginBottom:"20px"}}><img alt='signup_image' src={signup_image} /></figure>
                  <h2 onClick={() => this.props.onRouteChange('signin')} className="signup-image-link" >I am already member</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Register;
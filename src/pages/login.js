import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Link} from 'react-router-dom'


// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';



const styles={ 
    typography: {
        useNextVariants: true
      },
      form: {
        textAlign: 'center'
      },
      image: {
        margin: '20px auto 20px auto'
      },
      pageTitle: {
        margin: '10px auto 10px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      Button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: '#D93411',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      },
      }



export class login extends Component {
    constructor(){
        super()
        this.state ={
            email:'',
            password:'',
            laoding: false,
            errors: {}
        }
    }

    handleSubmit =(event)=>{
        event.preventDefault();
     this.setState({
         loading:true
     });
     
     const userData = {
         email: this.state.email,
         password : this.state.password
     }
     axios.post('/login', userData)
     .then(res=>{
         console.log(res.data);
         localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
         this.setState({
             loading:false
         });
         this.props.history.push('/')
     })
     .catch(err=>{
         this.setState({
             errors: err.response.data,
             loading:false
         })
     })
}

    handleChange=(event)=>{
        console.log('read')
       this.setState({
           [event.target.name]:event.target.value
       })
    }
    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state
        return (
            <Grid container className ={classes.form}>
            <Grid item sm/>
                   <Grid item sm>
                       <p>Logo</p>
                       {/* <img src={} alt="image"/> */}

                       <Typography variant="h4" className={classes.pageTitle}>
                          Login
                       </Typography>
                       <form noValidate onSubmit={this.handleSubmit}>
                           <TextField 
                           id="email" 
                           name="email" 
                           type="email" 
                           label="email" 
                           className={classes.TextField}
                           helperText ={errors.email}
                           error={errors.email ? true : false}
                           value={this.state.email} 
                           onChange={this.handleChange} 
                            fullWidth/>
                           <TextField 
                           id="password" 
                           name="password" 
                           type="password" 
                           label="password" 
                           helperText ={errors.password}
                           error={errors.password ? true : false}
                           className={classes.TextField}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth/>
                            {errors.general && (
                                <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                            )}
                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.Button}
                        disabled={loading}>
                            Login 
                         {loading && (
                             <CircularProgress size={30} className={classes.progress}/>
                         )}
                            </Button>
                       
                       <br />
                        <small>dont have an account ? sing up <Link to="/signup">here</Link></small>
                       </form>
                   </Grid>
            <Grid item sm/>       
            </Grid>
        )
    }
}

login.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login);


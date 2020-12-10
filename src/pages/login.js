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

// Redux stuff
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userAction'

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
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.state({errors:nextProps.UI.errors});
        }
       
    }

    handleSubmit =(event)=>{
    event.preventDefault();
     const userData = {
         email: this.state.email,
         password : this.state.password
     };
     this.props.loginUser(userData, this.props.history)
}

    handleChange=(event)=>{
        console.log('read')
       this.setState({
           [event.target.name]:event.target.value
       })
    }
    render() {
        const {classes, UI:{loading} } = this.props;
        const {errors} = this.state
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
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};


const mapStateToProps = (state)=>({
    user: state.user,
    UI: state.UI
})

const mapActionToProps ={
    loginUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login));


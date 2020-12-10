import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Button from '@material-ui/core/Button'

class navbar extends Component {
    render() {
        return (
           <AppBar position="fixed">
               <ToolBar>
            <Button color="inherit" component={Link} to="/login">login</Button>
            <Button color="inherit" component={Link} to="/">home</Button>
            <Button color="inherit" component={Link} to="/signup">singup</Button>
                </ToolBar>
           </AppBar>
        )
    }
}

export default navbar

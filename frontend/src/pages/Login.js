import React, { Component } from 'react';
import './Login.css';
import twiterLogo from '../twitter.svg'
import api from '../services/api';

class Login extends Component {
    state = {
        username: '',
    };

    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const { username } = this.state;

        // Verifica se usuario digitou um username
        if(!username.length) return

        // Salva o username no navegador
        localStorage.setItem('@GoTwitter:username', username);

        this.props.history.push('/timeline');
    }

    render() {
        return (
            <div className='login-wrapper'>
                <img src={twiterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Username" value={ this.state.username } onChange={ this.handleChange('username') }/>
                    <button type='submit'>Entrar</button>
                </form>
            </div>
        )
    }
}

export default Login
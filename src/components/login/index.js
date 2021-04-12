import { Component } from 'react';
import './style.css';
import api from '../../services/api';
import { login } from '../../services/auth';
import naveLogoRocket from '../../assets/nave-rocket-logo.svg';
import naveLogo from '../../assets/nave-logo.svg';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'Informe o e-mail e senha para continuar!' });
    } else {
      try {
        const response = await api.post(
          'https://navedex-api.herokuapp.com/v1/users/login',
          { email, password }
        );
        login(response.data.token);
        this.props.history.push('/home');
      } catch (error) {
        this.setState({
          error: 'Erro. Verifique suas credenciais.',
        });
      }
    }
  };

  render() {
    return (
      <div className='container d-flex justify-content-center'>
        <div className='login'>
          <div className='card'>
            <div className='logo'>
              <img alt='' className='group' src={naveLogoRocket} />
              <img alt='' className='group-two' src={naveLogo} />
            </div>
            <form onSubmit={this.handleSignIn}>
              <div className='e-mail-two'>
                <label className='label'>E-mail</label>
                <div className='e-mail'>
                  <input
                    type='text'
                    className='nome'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    placeholder='E-mail'
                    autoComplete='on'
                  />
                </div>
              </div>
              <div className='e-mail-two'>
                <label className='label'>Senha</label>
                <div className='e-mail'>
                  <input
                    type='password'
                    className='nome'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    placeholder='Senha'
                    autoComplete='on'
                  />
                </div>
              </div>

              <div>
                <button type='submit' className='button-default'>
                  Entrar
                </button>
              </div>
              <br />
              {this.state.error && <p>{this.state.error}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

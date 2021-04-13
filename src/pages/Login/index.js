import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Forms/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import { login } from '../../services/auth';

import imgLogo from '../../assets/logo.png';

import './styles.css';

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  async function handleLogin() {
    if (!formLogin.email || !formLogin.password) {
      setError('Informe o e-mail e senha para continuar.');
    } else {
      try {
        setLoading(true);
        const { data } = await api.post('/users/login', formLogin);
        setLoading(false);

        login(data.token);
        history.push('/home');
      } catch (error) {
        setLoading(false);
        setError('Erro. Verifique suas credencias.');
      }
    }
  }

  return (
    <div className='container-login'>
      <div className='card-login'>
        <img src={imgLogo} alt='Logo' />

        <form>
          <Input
            label='E-mail'
            name='email'
            id='email'
            placeholder='E-mail'
            value={formLogin.email}
            onChange={(event) =>
              setFormLogin({ ...formLogin, email: event.target.value })
            }
          />

          <Input
            label='Senha'
            placeholder='Senha'
            name='password'
            id='password'
            value={formLogin.password}
            onChange={(event) =>
              setFormLogin({ ...formLogin, password: event.target.value })
            }
            type='password'
          />

          <Button disabled={loading} onClick={handleLogin} type='button'>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          <br />
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;

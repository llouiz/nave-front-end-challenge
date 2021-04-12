import React, { Component } from 'react';
import './style.css';
import { logout } from '../../services/auth';
import Header from '../header';
import api from '../../services/api';
import { getToken } from '../../services/auth';

class Add extends Component {
  constructor() {
    super();
    this.state = {
      job_role: '',
      admission_date: '',
      birthdate: '',
      project: '',
      name: '',
      url: '',
      error: '',
    };

    this.addNaver = this.addNaver.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  addNaver = async (e) => {
    e.preventDefault();
    const token = getToken();

    const {
      job_role,
      admission_date,
      birthdate,
      project,
      name,
      url,
    } = this.state;

    if (
      !job_role ||
      !admission_date ||
      !birthdate ||
      !project ||
      !name ||
      !url
    ) {
      this.setState({
        error: 'Preencha todos os campos para continuar',
      });
    } else {
      try {
        api.post(
          'https://navedex-api.herokuapp.com/v1/navers',
          { job_role, admission_date, birthdate, project, name, url },
          { headers: { Authorization: token } }
        );

        window.location.href = '#modal';

        //Resetando Form
        this.setState({
          job_role: '',
          admission_date: '',
          birthdate: '',
          project: '',
          name: '',
          url: '',
          error: '',
        });
      } catch (error) {
        this.setState({
          error: 'Erro no cadastro',
        });
      }
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleLogout = () => {
    logout();
    localStorage.clear();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className='container d-flex justify-content-center adicionar-naver'>
        {/* Header */}
        <Header />
        <div className='flex-wrapper-one'>
          <div className='arrow-icon'>
            <a href='/home'>
              <span className='material-icons'>arrow_back_ios_new</span>
            </a>
          </div>
          <h2>Adicionar Naver</h2>
        </div>

        <form onSubmit={this.addNaver}>
          <div>
            <div className='flex-wrapper-two'>
              <div className='nome-two'>
                <label className='nome'>Nome</label>
                <div className='nome'>
                  <input
                    type='text'
                    className='nome'
                    name='name'
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    placeholder='Nome'
                  />
                </div>
              </div>
              <div className='nome-two'>
                <label className='nome'>Cargo</label>
                <div className='nome'>
                  <input
                    type='text'
                    className='nome'
                    name='job_role'
                    value={this.state.job_role}
                    onChange={this.handleInputChange}
                    placeholder='Cargo'
                  />
                </div>
              </div>
            </div>
            <div className='flex-wrapper-two'>
              <div className='nome-two'>
                <label className='nome'>Idade</label>
                <div className='nome'>
                  <input
                    type='text'
                    className='nome'
                    name='birthdate'
                    value={this.state.birthdate}
                    onChange={this.handleInputChange}
                    placeholder='Idade'
                  />
                </div>
              </div>
              <div className='nome-two'>
                <label className='nome'>Tempo de empresa</label>
                <div className='nome'>
                  <input
                    type='text'
                    className='nome'
                    name='admission_date'
                    value={this.state.admission_date}
                    onChange={this.handleInputChange}
                    placeholder='Tempo de empresa'
                  />
                </div>
              </div>
            </div>
            <div className='flex-wrapper-two'>
              <div className='nome-two'>
                <label className='nome'>Projetos que participou</label>
                <div className='nome'>
                  <input
                    type='text'
                    className='nome'
                    name='project'
                    value={this.state.project}
                    onChange={this.handleInputChange}
                    placeholder='Projetos que participou'
                  />
                </div>
              </div>
              <div className='nome-two'>
                <label className='nome'>URL da foto do naver</label>
                <div className='nome'>
                  <input
                    type='text'
                    className='nome'
                    name='url'
                    value={this.state.url}
                    onChange={this.handleInputChange}
                    placeholder='URL da foto do naver'
                  />
                </div>
              </div>
            </div>

            <div className='salvar'>
              <button type='submit' className='button-default'>
                Salvar
              </button>
            </div>
          </div>
          <br />
          <div className='d-flex justify-content-center'>
            {this.state.error && (
              <p className='error-msg'>{this.state.error}</p>
            )}
          </div>

          <div id='modal' className='overlay'>
            <a className='cancel' href='#_'></a>
            <div className='popup'>
              <div className='flex-wrapper-one-popup'>
                <h3 className='naver-excluido'>Naver criado</h3>
                <div className='close-icon'>
                  <a className='close' href='#!'>
                    <span className='material-icons'>close</span>
                  </a>
                </div>
              </div>
              <div className='msg'>
                <p>Naver criado com sucesso!</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Add;

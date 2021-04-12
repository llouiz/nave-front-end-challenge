import React, { Component } from 'react';
import './style.css';
import Header from '../header';
import api from '../../services/api';
import NotFound from '../notFound';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      job_role: '',
      admission_date: '',
      birthdate: '',
      project: '',
      name: '',
      url: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getNaverById = this.getNaverById.bind(this);
    this.editNaver = this.editNaver.bind(this);
  }

  componentDidMount() {
    this.getNaverById();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  editNaver = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const {
      job_role,
      admission_date,
      birthdate,
      project,
      name,
      url,
    } = this.state;

    api
      .put(`https://navedex-api.herokuapp.com/v1/navers/${id}`, {
        job_role,
        admission_date,
        birthdate,
        project,
        name,
        url,
      })
      .then((naver) => {
        console.log(naver);
        window.location.href = '#modal';
      })
      .catch((error) => {
        console.log('Error...');
      });
  };

  getNaverById() {
    const id = this.props.match.params.id;

    api
      .get(`https://navedex-api.herokuapp.com/v1/navers/${id}`)
      .then((naver) => {
        const birthdate = new Date(naver.data.birthdate);
        const admission_date = new Date(naver.data.admission_date);

        //Idade do Naver
        const formattedBirthdate = `${birthdate.getDate() + 1}/${
          birthdate.getMonth() + 1
        }/${birthdate.getFullYear()}`;

        //Tempo de trabalho do Naver
        const formattedAdmission_date = `${admission_date.getDate() + 1}/${
          admission_date.getMonth() + 1
        }/${admission_date.getFullYear()}`;

        this.setState({
          job_role: naver.data.job_role,
          admission_date: formattedAdmission_date,
          birthdate: formattedBirthdate,
          project: naver.data.project,
          name: naver.data.name,
          url: naver.data.url,
        });
      })
      .catch((error) => {
        <NotFound />;
      });
  }

  render() {
    return (
      <div className='container editar-naver'>
        <Header />
        <div className='flex-wrapper-one'>
          <div className='arrow-icon'>
            <a href='/home'>
              <span className='material-icons'>arrow_back_ios_new</span>
            </a>
          </div>
          <h2>Editar Naver</h2>
        </div>

        <form onSubmit={this.editNaver}>
          <div className='content'>
            <div className='flex-wrapper-two'>
              <div className='nome-two'>
                <label className='nome'>Nome</label>
                <div className='nome'>
                  <input
                    type='text'
                    name='name'
                    value={this.state.name}
                    className='nome'
                    placeholder='Nome'
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className='nome-two'>
                <label className='nome'>Cargo</label>
                <div className='nome'>
                  <input
                    type='text'
                    name='job_role'
                    value={this.state.job_role}
                    className='nome'
                    placeholder='Cargo'
                    onChange={this.handleInputChange}
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
                    name='birthdate'
                    value={this.state.birthdate}
                    className='nome'
                    placeholder='Idade'
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className='nome-two'>
                <label className='nome'>Tempo de empresa</label>
                <div className='nome'>
                  <input
                    type='text'
                    name='admission_date'
                    value={this.state.admission_date}
                    className='nome'
                    placeholder='Tempo de empresa'
                    onChange={this.handleInputChange}
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
                    name='project'
                    value={this.state.project}
                    className='nome'
                    placeholder='Projetos que participou'
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className='nome-two'>
                <label className='nome'>URL da foto do naver</label>
                <div className='nome'>
                  <input
                    type='text'
                    name='url'
                    value={this.state.url}
                    className='nome'
                    placeholder='URL da foto do naver'
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='salvar'>
            <button type='submit' className='button-default'>
              Salvar
            </button>
          </div>

          <div id='modal' className='overlay'>
            <a className='cancel' href='#_'></a>
            <div className='popup'>
              <div className='flex-wrapper-one-popup'>
                <h3 className='naver-excluido'>Naver atualizado</h3>
                <div className='close-icon'>
                  <a className='close' href='#!'>
                    <span className='material-icons'>close</span>
                  </a>
                </div>
              </div>
              <div className='msg'>
                <p>Naver atualizado com sucesso!</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Edit;

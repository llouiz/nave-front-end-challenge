import React, { Component } from 'react';
import './style.css';
import Header from '../header';
import api from '../../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      naverId: '',
      job_role: '',
      admission_date: '',
      birthdate: '',
      project: '',
      name: '',
      url: '',
      naversList: [],
    };
    this.listNavers = this.listNavers.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.listNavers();
  }

  listNavers = () => {
    api
      .get('https://navedex-api.herokuapp.com/v1/navers')
      .then((list) => {
        this.setState({
          naversList: list.data,
        });
      })
      .catch((error) => {
        console.log('Erro na chamada do endpoint.');
      });
  };

  delete = (id) => {
    api
      .delete(`https://navedex-api.herokuapp.com/v1/navers/${id}`)
      .then((nave) => {
        window.location.href = '#modal-excluido';
        window.location.reload();
      });
  };

  handleClick = (e, data) => {
    api
      .get(`https://navedex-api.herokuapp.com/v1/navers/${data}`)
      .then((naver) => {
        const birthdate = new Date(naver.data.birthdate);
        const admission_date = new Date(naver.data.admission_date);

        //Idade do Naver
        const date = new Date();
        let idade = date.getFullYear() - birthdate.getFullYear();

        //Tempo de trabalho do Naver
        const formattedAdmission_date = `${admission_date.getDate() + 1}/${
          admission_date.getMonth() + 1
        }/${admission_date.getFullYear()}`;

        this.setState({
          naverId: naver.data.id,
          job_role: naver.data.job_role,
          admission_date: formattedAdmission_date,
          birthdate: idade,
          project: naver.data.project,
          name: naver.data.name,
          url: naver.data.url,
        });
      })
      .catch((error) => {
        console.log('Naver não encontrado...');
      });
  };

  handleClickEdit = (e, data) => {
    window.location.href = '/edit/' + data;
  };

  handleClickDelete = (e, data) => {
    this.setState({
      naverId: data,
    });
  };

  routeChange = () => {
    let path = `/add`;
    this.props.history.push(path);
  };

  onClickCancel() {
    window.location.href = '#_';
  }

  render() {
    return (
      <div className='container home'>
        <div id='#_'></div>
        {/* Header */}
        <Header />

        <div className='flex-wrapper-one'>
          <h2 className='navers'>Navers</h2>
          <div className='button-desktop-default'>
            <button
              type='button'
              className='button-default'
              onClick={this.routeChange}
            >
              Adicionar Naver
            </button>
          </div>
        </div>
        <div className='flex-wrapper-two'>
          {this.state.naversList.map((list) => (
            <div className='card-1'>
              <img alt='' className='rectangle-3' src={list.url} />
              <p className='nome'>{list.name}</p>
              <p className='cargo'>{list.job_role}</p>
              <div className='flex-wrapper-six'>
                <div className='delete-icon'>
                  <a
                    href='#modal-confirm'
                    onClick={(e) => this.handleClickDelete(e, list.id)}
                  >
                    <span className='material-icons'>delete</span>
                  </a>
                </div>
                <div className='edit-icon'>
                  <a
                    href='#modal-info'
                    onClick={(e) => this.handleClick(e, list.id)}
                  >
                    <span className='material-icons'>edit</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id='modal-confirm' className='overlay'>
          <a className='cancel' href='#_'></a>
          <div className='popup'>
            <h3 className='excluir-naver'>Excluir Naver</h3>
            <p className='confirm'>
              Tem certeza que deseja excluir este Naver?
            </p>
            <div className='flex-wrapper-one-confirm'>
              <div className='button-desktop-default-cancelar'>
                <button
                  type='button'
                  onClick={this.onClickCancel}
                  className='button-default-cancelar'
                >
                  Cancelar
                </button>
              </div>
              <div className='button-desktop-default-excluir'>
                <button
                  type='button'
                  className='button-default-excluir'
                  onClick={(e) => this.delete(this.state.naverId)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id='modal-excluido' className='overlay'>
          <a className='cancel' href='#_'></a>
          <div className='popup'>
            <div className='flex-wrapper-one-popup'>
              <h3 className='naver-excluido'>Naver excluído</h3>
              <div className='close-icon'>
                <a className='close' href='#!'>
                  <span className='material-icons'>close</span>
                </a>
              </div>
            </div>
            <div className='msg'>
              <p>Naver excluído com sucesso!</p>
            </div>
          </div>
        </div>

        <div id='modal-info' class='overlay'>
          <a class='cancel' href='#_'></a>
          <div class='visualizacao'>
            <div class='flex-wrapper-one-info'>
              <div class='flex-wrapper-two-info'>
                <p class='nome-info'>{this.state.name}</p>
                <div class='close-icon'>
                  <a class='close' href='#!'>
                    <span class='material-icons'>close</span>
                  </a>
                </div>
              </div>
              <p class='cargo-info'>{this.state.job_role}</p>
              <p class='idade'>Idade</p>
              <p class='cargo-info'>{this.state.birthdate}</p>
              <p class='idade'>Tempo de empresa</p>
              <p class='cargo-info'>Desde de {this.state.admission_date}</p>
              <p class='idade'>Projetos que participou</p>
              <p class='project'>{this.state.project}</p>
              <div class='flex-wrapper-two-info'>
                <div class='close-icon-two'>
                  <a href='#modal-confirm'>
                    <span class='material-icons'>delete</span>
                  </a>
                </div>
                <div class='close-icon-three'>
                  <a
                    href='#!'
                    onClick={(e) => this.handleClickEdit(e, this.state.naverId)}
                  >
                    <span class='material-icons'>edit</span>
                  </a>
                </div>
              </div>
            </div>
            <img
              alt=''
              class='img-info'
              src='https://static.overlay-tech.com/assets/055037b6-daa8-4260-aba3-91ddd783edcb.png'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

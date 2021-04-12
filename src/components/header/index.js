import React, { Component } from 'react';
import './style.css';
import naveLogoRocket from '../../assets/nave-rocket-logo-sm.svg';
import naveLogo from '../../assets/nave-logo-sm.svg';
import { logout } from '../../services/auth';

class Header extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    logout();
    localStorage.clear();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className='top-content'>
        <div className='header'>
          <div className='logo'>
            <img alt='' className='group' src={naveLogoRocket} />
            <img alt='' className='group-two' src={naveLogo} />
          </div>
          <a href='/' onClick={this.handleLogout} className='sair'>
            Sair
          </a>
        </div>
      </div>
    );
  }
}

export default Header;

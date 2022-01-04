import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();
  const [email, setEmail] = React.useState(null);

  React.useEffect(() => {
    const emailLocal = window.localStorage.getItem('user');
    const emailObj = JSON.parse(emailLocal);
    setEmail(emailObj.email);
  }, []);

  function handleClickFavorite() {
    history.push('/receitas-favoritas');
  }

  function handleClickDone() {
    history.push('/receitas-feitas');
  }

  function handleClickLogOut() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <>
      <Header title="Perfil" searchHidden />
      <div>
        <p data-testid="profile-email">{email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleClickDone }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavorite }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogOut }
        >
          Sair
        </button>
      </div>
      <Footer />
    </>
  );
}

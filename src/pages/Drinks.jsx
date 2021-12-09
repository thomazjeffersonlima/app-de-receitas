import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipiesContext from '../contexts/RecipiesContext';

export default function Drinks() {
  const { drinksRecipies } = useContext(RecipiesContext);
  return (
    <>
      <Header title="Bebidas" />
      <div>Bebidas</div>
    </>
  );
}

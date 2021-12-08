import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipiesContext from '../contexts/RecipiesContext';

export default function Foods() {
  const { foodsRecipies } = useContext(RecipiesContext);

  console.log(foodsRecipies);

  return (
    <>
      <Header title="Comidas" />
      <div>Comidas</div>
    </>
  );
}

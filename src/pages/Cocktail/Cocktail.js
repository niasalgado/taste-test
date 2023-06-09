import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import './Cocktail.css'

export default function CocktailIngredients() {
  const { id } = useParams()
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  
  const [cocktail, setCocktail] = useState(null);
  const fetchCocktail = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCocktail(data.drinks[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const [showIngredients, setShowIngredients] = useState(true);
  const handleClick = () => setShowIngredients(!showIngredients);
  
  useEffect(() => {
    fetchCocktail();
  }, []);
  

  const loaded = () => {
    return (
      <>
        <NavBar text={'Back to Cocktail Index'}/>
        <h2>{cocktail.strDrink}</h2>
        
        <div className='ingredients-container'>
          <div className='ingredients'>
            <button className='handle-btn' onClick={handleClick}>
              {showIngredients ? 'Hide' : 'Show'}
            </button>

            {showIngredients && 
              <>
                <ul className='ingrUl'>
                  <li>Glass: {cocktail.strGlass}</li>
                  <li>{cocktail.strMeasure1} {cocktail.strIngredient1}</li>
                  <li>{cocktail.strMeasure2} {cocktail.strIngredient2}</li>
                  <li>{cocktail.strMeasure3} {cocktail.strIngredient3}</li>
                </ul>

                <p>Instructions: {cocktail.strInstructions}</p>
              </>
            }
          </div>

          <div className='ingrImg'>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          </div>
        </div>
      </>
    )
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return <section>{cocktail ? loaded() : loading()}</section>;
}
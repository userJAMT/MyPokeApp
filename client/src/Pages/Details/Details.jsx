import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getById, clear } from '../../actions'
import Loading from '../../components/Loading/Loading.jsx'

function Details() {
  const params = useParams()
  const dispatch = useDispatch()
  const stateLoading = useSelector(state => state.loading)
  
  useEffect(() => {
    dispatch(clear())
    dispatch(getById(params.id))
  }, [dispatch, params.id])

  const pokemonDetail = useSelector(state => state.pokemonDetail)

  return (
    <div> 
      {stateLoading ? <Loading/>
      : <div>
          <h4>ID: {pokemonDetail.id}</h4>
          <img src={pokemonDetail.img} alt = 'Pokemon img' width='250px' height='250px'/>
          <h1>{pokemonDetail.name}</h1>
          {pokemonDetail.types?.map(e => {
            return <div>{e}</div>
          })}
          <ul>
            <li>HP: {pokemonDetail.hp}</li>
            <li>attack: {pokemonDetail.attack}</li>
            <li>defense: {pokemonDetail.defense}</li>
            <li>speed: {pokemonDetail.speed}</li>
            <li>height: {pokemonDetail.height}</li>
            <li>weight: {pokemonDetail.weight}</li>
          </ul>
      </div>      
      }
    </div>
  )
}

export default Details
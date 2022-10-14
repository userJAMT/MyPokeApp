import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getById, clear } from '../../actions'
import Loading from '../../components/Loading/Loading.jsx'
import s from './Details.module.css'

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
    <div className={s.Details}> 
      {stateLoading ? <Loading/>
      : <div className={s.content}>

          {/* <h4>{pokemonDetail.id}</h4> */}
          <img src={pokemonDetail.img} alt='Pokemon img'/>
          <h2>{pokemonDetail.name}</h2>
          <div className={s.types}>
            {pokemonDetail.types?.map(e => {
              return <div className={s.type}>{e}</div>
            })}
          </div>
          <div className={s.wrapper}>
            <div className={s.box}>
              <div className={s.stats}>HP: {pokemonDetail.hp}</div>
              <div className={s.stats}>Attack: {pokemonDetail.attack}</div>
              <div className={s.stats}>Defense: {pokemonDetail.defense}</div>
              <div className={s.stats}>Speed: {pokemonDetail.speed}</div>
              <div className={s.stats}>Height: {pokemonDetail.height}</div>
              <div className={s.stats}>Weight: {pokemonDetail.weight}</div>
            </div>
          </div>
      </div>      
      }
    </div>
  )
}

export default Details
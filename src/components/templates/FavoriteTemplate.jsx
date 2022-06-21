/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import BooksFavCardList from 'components/organisms/BooksFavCardList'
import { showCollection } from 'stores/ManageCollection'

import { css } from '@emotion/react'
import { styling } from 'constants'

export default function FavoriteTemplate() {
  const [datas, setDatas] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getDataFavorite = async() => {
    setIsLoading(true)
    const collections = await showCollection()
    console.log(collections)
    setDatas(collections)
    setIsLoading(false)
  }

  useEffect(() => {
    getDataFavorite()
  }, []);

  const containerStyle = css`
    padding: 0 5px;
    margin: auto;
    max-width: 960px;
    padding: 10px
    ${styling.MQMAX[4]} {
      max-width: 1280px;
    }
    ${styling.MQMIN[4]} {
      max-width: 1280px;
    }
  `

  return (
    <div css={containerStyle}>
      {Object.keys(datas).length < 1 ? (
        <h2>You don't have a favorite book yet</h2>
      ) : (
        <BooksFavCardList 
        datas={datas}
        isLoading={isLoading}
        />
      )
      }
    </div>
  )
}

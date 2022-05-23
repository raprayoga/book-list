/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import BooksCard from "components/molecules/BooksCard";
import { styling } from 'constants'
import CardSkeleton from 'skeleton/CardSkeleton';
import { Link } from 'react-router-dom';

export default function BooksFavCardList(props) {
  const skeleton = Array(10).fill(null);

  const cardWrapStyle = css`
    padding: 8px;
    ${styling.MQMIN[2]} {
      padding: 0;
    }
    & > a {
      text-decoration: none;
    }
  `

  const cardContainerStyle = css`
    justify-content: space-around;
    display: grid;
    grid-template-columns: auto auto;
    ${styling.MQMIN[2]} {
      grid-template-columns: auto auto auto;
      gap: 10px;
      padding: 0 8px;
    }
    ${styling.MQMIN[3]} {
      grid-template-columns: auto auto auto auto;
    }
    ${styling.MQMIN[4]} {
      grid-template-columns: auto auto auto auto auto;
    }
  `

  return (
    <div css={cardContainerStyle}>
      {props.isLoading ? (skeleton.map((value, index)=> (
        <div css={cardWrapStyle} key={index}>
          <CardSkeleton />
        </div>
      ))
      ) : (
        Object.keys(props.datas).map((key)=> (
          <div css={cardWrapStyle} key={key}>
            <Link to={`/detail/${key}`}>
              <BooksCard
                data={props.datas[key]}
              />
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

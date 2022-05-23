/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { css } from '@emotion/react'
import Card from 'components/atoms/Card'
import defaultImage from 'assets/image/default.png'

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

function ImageBook(props) {
  const [onLoad, setOnLoad] = useState(false);

  const showImage = () => {
    setOnLoad(true)
  }

  const cardCoverStyle = css`
    display: flex;
    justify-content: center;
    height: 200px;
    width: 100%;
  `

  const imageCardStyle = css`
    border-radius: 8px 8px 0px 0px;
    width: 100%;
  `
  return (
    <div css={cardCoverStyle}>
      <img src={defaultImage} alt={`image onload`} css={imageCardStyle} style={ onLoad ? {display: "none"} : {}} />
      <img src={props.data.volumeInfo.imageLinks.thumbnail} alt={`image ${props.data.volumeInfo.title}`} onLoad={showImage} css={imageCardStyle} style={ onLoad ? {} : {display: "none"}} />
    </div>
  )
}

function CaptionBook(props) {
  const cardContentStyle = css`
    display: flex;
    flex: 1;
    width: 90%;
    vertical-align: middle;
    padding: 0px 8px;
    flex-direction: column;
    align-items: start;
    font-size: 0.86rem;
    color: #212121;
    & > p {
      margin: 0 0 0.4rem 0;
    }
  `

  const titleStyle = css`
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 0.4rem !important;
  `

  const genresStyle = css`
    font-size: 0.74rem;
  `

  return (
    <div css={cardContentStyle}>
      <p css={titleStyle}>{ props.data.volumeInfo.title }</p>
      {props.data.averageRating && <Rater interactive={false} total={5} rating={parseInt(props.data.averageRating)} />}
      <p css={genresStyle}>{props.data.volumeInfo.categories}</p>
      <p>{props.data.volumeInfo.authors}</p>
    </div>
  )
}

export default function BooksCard(props) {
  return (
    <Card 
      cardCover={<ImageBook data={props.data} />}
      cardContent={<CaptionBook data={props.data} />}
      css={props.cssOverride}
    />
  )
}

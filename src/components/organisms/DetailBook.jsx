/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import DetailSkeleton from 'skeleton/DetailSkeleton';
import { css } from '@emotion/react';
import { styling } from 'constants'
import defaultImage from 'assets/image/default.png'

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

function Image(props) {
  const [onLoad, setOnLoad] = useState(false);

  const showImage = () => {
    setOnLoad(true)
  }

  const ImageStyle = css`
    width: 70%;
    ${styling.MQMAX[1]} {
      width: 100%;
    }
  `

  return (
    <>
      <img src={defaultImage} alt={`image onload`} css={ImageStyle} style={ onLoad ? {display: "none"} : {}} />
      <img src={props.imageSrc} alt={`image ${props.title}`} css={ImageStyle} onLoad={showImage} style={ onLoad ? {} : {display: "none"}} />
    </>
  )
}

function BooksDescription(props) {
  return (
    <div>
      <h4>Description</h4>
      <p css={css`text-align: justify;`}>{props.description}</p>
    </div>
  )
}

function BooksKeterangan(props) {

  const Rating = () => {
    return (
    props.data.averageRating ? (
        <Rater interactive={false} total={5} rating={parseInt(props.data.averageRating)} />
      ) : (
        <p>No Rating</p>
      )
    
    )
  }

  return (
    <div css={css`margin-left: 20px;`}>
      <h3>Information</h3>
      <h4>Genre</h4>
      <p>{props.data.genres}</p>
      <h4>Rating</h4>
      <Rating />
      <h4>Author</h4>
      <p>{props.data.authors}</p>
      <h4>Page Count</h4>
      <p>{446}</p>
    </div>
  )
}


export default function DetailBook(props) {

  const detailStyle = css`
    margin: 0 auto;
    width: 98%;
    max-width: 800px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px 16px;
  `

  const imageWrapStyle = css`
    display: flex;
    ${styling.MQMAX[1]} {
      flex-direction: column;
    }
  `

  return (
    <>
      {!props.isloading && props.data.volumeInfo !== undefined ? (
        <div css={detailStyle}>
          <h2>{props.data.volumeInfo.title}</h2>
          <div css={imageWrapStyle}>
            <Image 
              title={props.data.volumeInfo.title}
              imageSrc={props.data.volumeInfo.imageLinks.medium}
            />
            <BooksKeterangan data={props.data.volumeInfo} />
          </div>
          <BooksDescription description={props.data.volumeInfo.description}/>
        </div>
      ) : (
        <DetailSkeleton />
      )}
    </>
  )
}

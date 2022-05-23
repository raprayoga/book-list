/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react'
import { styling } from 'constants'

import BooksCardList from "components/organisms/BooksCardList";
import searchBooks from 'services/getData';
import FormSearch from 'components/organisms/FormSearch';

export default function BooksList() {
  const [keyword, setKeyword] = useState('')
  const [datas, setDatas] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    try {
      setIsLoading(true)
      await searchBooks(keyword)
        .then((resp) => {
          setDatas(resp.data.items)
        })
        .catch((error) => {
          window.$toast.fire({
            icon: "error",
            title: error.response.data.message || "Connection Error",
          });
        });
    } catch (err) {
        window.$toast.fire({
          icon: "error",
          title: "Connection Error",
        });
    };
    setIsLoading(false)
  }

  const submitForm = () => {
    getData()
  }

  const handleSubmit = async (event) => {
    submitForm()
    event.preventDefault();
  }

  const handleChange = (event) => {
    setKeyword(event.target.value)
  }

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
      <FormSearch
        value={keyword}
        handleChange={(e) => handleChange(e)}
        onClick={(e) => handleSubmit(e)}
      />
      <BooksCardList 
        datas={datas}
        isLoading={isLoading}
      />
    </div>
  )
}

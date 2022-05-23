/** @jsxImportSource @emotion/react */
import React from 'react'
import InputForm from 'components/atoms/InputForm'
import Button from 'components/atoms/Button'
import { css } from '@emotion/react'

export default function FormSearch(props) {
  const handleChange = (event) => {
    props.handleChange(event)
  }

  const wrapFormStyle = css`
    display: flex;
    max-width: 1000px;
    margin: 30px auto;
  `

  const buttonStyle = css`
    height: 35px;
    width: 30%;
    margin-left: 20px;
  `

  const inputStyle = css`
    width: 70%;
  `

  return (
    <div css={wrapFormStyle}>
      <InputForm
        css={inputStyle}
        placeholder='Search Book'
        onChange={(e) => handleChange(e)}
        value={props.value}
        type='text'
      />
      <Button
        css={buttonStyle}
        text='Search'
        onClick={props.onClick}
      />
    </div>
  )
}

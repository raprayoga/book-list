/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LikeButton from 'components/molecules/LikeButton'
import LikedButton from 'components/molecules/LikedButton';

import DetailBook from 'components/organisms/DetailBook'
import { showDetail } from 'services/getData'
import { bookAlreadyLiked, likeBook, removeBook } from 'stores/ManageCollection';

import { css } from '@emotion/react'

export default function SearchBooksTemplate() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasLiked, setHasLiked] = useState(false)
  const [booksDetail, setBooksDetail] = useState({})
  const { id } = useParams();

  const getData = async () => {
    try {
      setIsLoading(true)
      await showDetail(id)
        .then((resp) => {
          setBooksDetail(resp.data)
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

  useEffect(() => {
    const collection = bookAlreadyLiked(id)
    if (collection) {
      setHasLiked(true)
      setBooksDetail(collection)
    } else getData()
  }, []);

  const handleLikeBook = async () => {
    await likeBook(booksDetail)
    setHasLiked(true)
    window.$toast.fire({
      icon: "success",
      title: "Book has saved to favorite",
    });
  }

  const handleRemoveLikeBook = async () => {
    await removeBook(booksDetail.id)
    setHasLiked(false)
    window.$toast.fire({
      icon: "success",
      title: "Book has remove from favorite",
    });
  }
  
  const container = css`
    margin: auto;
    max-width: 800px;
  `

  return (
    <div css={container}>
      <DetailBook
        data={booksDetail}
        isLoading={isLoading}
      />
      {hasLiked ? (
          <LikedButton
            onClick={() => handleRemoveLikeBook()}
          />
        ) : (
          <LikeButton
            onClick={() => handleLikeBook()}
          />
        )}
    </div>
  )
}

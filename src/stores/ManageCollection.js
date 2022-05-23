function initiateLocalStorage() {
  const data = localStorage.getItem("collections")
  if (!data) {
    localStorage.setItem("collections", JSON.stringify({collections: {}}))
  }
}

function showCollection() {
  let data = localStorage.getItem("collections")
  return JSON.parse(data).collections
}

function likeBook(payload) {
  let data = localStorage.getItem("collections")
  data = JSON.parse(data)
  const collectionList = data.collections
  if ( collectionList[payload.id] !== undefined ) return {sucess: false, message: 'book has liked'}

  data.collections[payload.id] = payload
  localStorage.setItem("collections", JSON.stringify(data))

  return  {success: true, message: 'Success like book', data: data.collections}
}

function removeBook(id) {
  let data = localStorage.getItem("collections")
  data = JSON.parse(data)
  const collectionList = data.collections
  if ( collectionList[id] === undefined ) return {sucess: false, message: 'book has removed before'}
  
  delete data.collections[id]
  localStorage.setItem("collections", JSON.stringify(data))

  return data.collections
}

function bookAlreadyLiked(id) {
  let data = localStorage.getItem("collections")
  data = JSON.parse(data)
  const collectionList = data.collections

  let doesBookExist = null
  Object.keys(collectionList).forEach((key) => {
    if (key === id) {
      return doesBookExist = collectionList[key]
    }
  });

  console.log(doesBookExist)

  return doesBookExist 
}

export { initiateLocalStorage, showCollection, likeBook, removeBook, bookAlreadyLiked }
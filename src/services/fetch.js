export const fetchData = (urls) => {
  return Promise.all(urls.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(payloadList => {
      const combined = payloadList.reduce((acc, payloadList) => {
        return acc.concat(payloadList.data.items)
      }, [])
      return combined;
    })
}
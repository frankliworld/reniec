
const url = "https://www.softwarelion.xyz/api/reniec/reniec-dni"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNDY3LCJjb3JyZW8iOiJ1aS5zcGFjZS5mckBnbWFpbC5jb20iLCJpYXQiOjE2NjIxNDE3Mzd9.SkGQGmN8LV6Xex9faOLuWms8yMd3pkyl_FxB6tUnP3g"
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
}

async function getInfoWithDni(dni) {
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({dni})
  })
  const {result} = await response.json()
  return result
  
}
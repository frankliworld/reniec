
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

//in development
async function getInfoWithNames({paterno, materno, nombres}) {
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({paterno, materno, nombres})
  })
  const {result} = await response.json()
  return result 
}

//in development
async function getInfoWithRuc(ruc) {
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ruc})
  })
  const {result} = await response.json()
  return result 
}

//in development
async function validateCPE({numRuc, codComp, numeroSerie, numero, fechaEmision, monto}){
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({numRuc, codComp, numeroSerie, numero, fechaEmision, monto})
  })
  const {result} = await response.json()
  return result 
}
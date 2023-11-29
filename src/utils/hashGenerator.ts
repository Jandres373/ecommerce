export const generateHash = ()=>{
  return require('crypto').randomBytes(64).toString('hex')
}
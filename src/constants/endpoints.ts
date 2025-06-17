export const baseUrl='http://192.168.0.101:6015/api/v1'
// user auth
export const loginUrl=`/auth/login`
export const refreshAccessToken=`/auth/refresh-access-token`
export const logout=`/auth/logout`
// user
export const medicalCreateSchema=`user/user-medical`
export const viewUserMedical=(id:number)=> {return `user/user-medical/${id}`}
export const medicalUpdateSchema=`user/user-medical`
export const viewAllMedicalDetails=`user/user-medical`

export  const deleteMedDetails=`/user/user-medical`
export  const deleteAllMedDetails=(id:number)=> {return `user/user-medical/${id}`}
export  const userProfile=`/user/profile`

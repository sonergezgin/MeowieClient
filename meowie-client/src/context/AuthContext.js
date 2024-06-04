import { createContext, useState } from "react";
import jwt_decode from "jwt-decode"; 
import {useNavigate} from 'react-router-dom';
import {toaster} from '../components/toastify/toastConstans'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{
    const navigate = useNavigate()
    const localToken = JSON.parse(localStorage.getItem('authTokens'))

    let [authTokens, setAuthTokens] = useState(()=> localToken ? localToken : null)
    let [user, setUser] = useState(()=>localToken ? jwt_decode(localToken['accessToken'])['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] : null)
    
    let loginUser = async (e) =>{
        try {
            e.preventDefault();
            let request = fetch('https://localhost:7208/api/Auth/Login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'usernameOrEmail' : e.target.usernameOrEmail.value,
                    'password' : e.target.password.value})
            })
            let response = await request
            if(response.ok){
                let result = await response.json()
                let resultUser = (jwt_decode(result.token.accessToken))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
                setAuthTokens(result.token)
                setUser(resultUser)
                localStorage.setItem("authTokens",JSON.stringify(result.token))
                toaster.success(`You have successfully logged in welcome back ${resultUser}`)
                navigate('/')
            }
            else{
                let result = await response.json()
                return result.message
            }         
        } catch (error) {
            toaster.error(error.message)
        }
    }

    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        toaster.success(`You have successfully logged out good bye!`)
        navigate('/')
    }

    let updateToken = async () => {

        let request = fetch('https://localhost:7208/api/Auth/RefreshTokenLogin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'RefreshToken' : authTokens.refreshToken})
        })
        let response = await request
        if(response.status === 200){
            let result = await response.json()
            setAuthTokens(result.token)
            setUser((jwt_decode(result.token.accessToken))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"])
            localStorage.setItem("authTokens",JSON.stringify(result.token))
        }
        else{
            logoutUser()
        }
    }

    let contextData ={
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        updateToken:updateToken
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

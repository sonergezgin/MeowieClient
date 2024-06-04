import { createContext} from "react";
import {useNavigate} from 'react-router-dom';
import {toaster} from '../components/toastify/toastConstans'
import jwt_decode from "jwt-decode"; 
const UserContext = createContext()

export default UserContext

export const UserProvider = ({children}) => {
    const navigate = useNavigate()

    let getUsernameAndToken = () =>{
        const localToken = JSON.parse(localStorage.getItem('authTokens'))
        if(localToken){
            var token = localToken['accessToken']
            var username = jwt_decode(localToken['accessToken'])['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
            return {token: token, username: username}
        }
        else return null
    }
    let registerUser = async (data) =>{
        try {
            let request = fetch('https://localhost:7208/api/Users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name' : data.name,
                    'username' : data.username,
                    'email' : data.email,
                    'password' : data.password,
                    'passwordConfirm' : data.confirmPassword
                })
            })
            let response = await request
            if(response.ok){
                toaster.success("User Created Succesfully")
                navigate('/login')
            }
            else{
                let result = await response.json()
                return result
            } 
        } catch (error) {
            toaster.error(error.message)
        }
    }

    let getUserProfile = async () => {
        try {
            const userAndToken = getUsernameAndToken()

            if(userAndToken){
                let request = fetch(`https://localhost:7208/api/Users/Profile?Username=${userAndToken.username}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + userAndToken.token
                    },
                })
                let response = await request
                if(response.ok){
                    let result = await response.json()
                    console.log(result.user)
                    return result.user
                }
                else{
                    toaster.error(response.status)
                } 
            }
            else{
                toaster.warning("Please first login")
                navigate(`/login`)
            }
        } catch (error) {
            
        }
    }

    let contextData = {
        registerUser:registerUser,
        getUserProfile:getUserProfile,
        getUsernameAndToken:getUsernameAndToken
    }
    
    return(
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );

}


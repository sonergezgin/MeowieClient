import React, { createContext, useContext } from 'react'
import UrlService from '../UrlService'
import { toaster } from '../components/toastify/toastConstans'
import UserContext from './UserContext'
import axios from 'axios'

const FileUploadContext = createContext()

export default FileUploadContext

export const FileUploadProvider = ({children}) => {

    const {getUsernameAndToken} = useContext(UserContext)
    
    const uploadImage = async (image) =>{
        try {
            var loggedUser = getUsernameAndToken().username

            const formData = new FormData();
            formData.append("image", image);
            formData.append("username", loggedUser);

            let response = await axios.post(UrlService.image.UploadProfileImage(), formData);
            if(response.status === 200){
                toaster.success("Fotoğraf başarıyla yüklendi")
                return response.data
            }
            else{
                toaster.error("Fotoğraf yüklenirken hata oluştu")
            }

        } catch (error) {
            toaster.error(error.message)
        }
    }

    let contextData = {
        uploadImage:uploadImage,
    }
    
    return(
        <FileUploadContext.Provider value={contextData}>
            {children}
        </FileUploadContext.Provider>
    );

}


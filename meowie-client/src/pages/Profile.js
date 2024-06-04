import React, { useContext, useEffect, useState } from 'react'
import ProfileHeader from '../components/profileComponents/ProfileHeader'
import UserContext from '../context/UserContext'
import ProfileBody from '../components/profileComponents/ProfileBody'

const Profile = () => {
    const [user,setUser] = useState(null)
    const {getUserProfile} = useContext(UserContext)

    useEffect(()=>{
        getUserProfile().then(result => setUser(result))
    },[])
  return (
    <div className=''>
        <ProfileHeader name={user?.name} username={user?.username} profileImage={user?.profileImage} biography={user?.biography}/>
        <ProfileBody username={user?.username}/>
    </div>
  )
}

export default Profile

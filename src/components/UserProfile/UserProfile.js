import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../Context/Context';
import BeATeamMemberFrom from '../DonarManageMent/BeATeamMemeber/BeATeamMemberFrom';
import "./UserProfile.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserProfile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://hstu-blood-share.herokuapp.com/donors");
            const record = await res.json();
            const user = record.filter(dt => dt.email === loggedInUser.email)
            setProfile(user)
        }
        fetchData();
    }, [])

    const handleDelete = (id) => {
        fetch(`http://hstu-blood-share.herokuapp.com/donors/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())// or res.text()) 
            .then(res => {
                if (res.deletedCount === 1) {
                    toast(`User ${id} deleted successfully`)
                    const newUser = profile.filter(ab => ab._id != id);
                    setProfile(newUser)
                }
            })
    }

    return (
        <>
            <div className="userProfile">
                <p>user Profile</p>
                {
                    profile.length ? profile.map((data, i) => {
                        const { Name, age, bloodGroup, department, email, gender, label, mobile, semester, _id, lastDonateDate } = data;
                        return (
                            <div key={i}>
                                <p>Name :{Name}</p>
                                <p>Age :{age}</p>
                                <p>mobile :{mobile}</p>
                                <p>BloodGroup :{bloodGroup}</p>
                                <p>department :{department}</p>
                                <p>email :{email}</p>
                                <p>gender :{gender}</p>
                                <p>label :{label}</p>
                                <p>mobile :{label}</p>
                                <p>semester :{semester}</p>
                                <p>lastDonateDate :{lastDonateDate}</p>
                                <button className="btn btn-primary" onClick={() => handleDelete(_id)}>remove profile</button>
                                <Link className="btn btn-primary" to={`/update-profile/${_id}`}>Update Profile ?</Link>

                            </div>

                        )
                    }) : <p>want to donate blood ? <Link to='/donate'>click to donate</Link> </p>
                }
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

            </div>
            <BeATeamMemberFrom />
        </>
    );
};

export default UserProfile;
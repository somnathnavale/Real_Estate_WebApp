// import React from 'react'
// import {useNavigate} from 'react-router-dom';
// import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
// import { app } from '../firebase';
// import { useDispatch } from 'react-redux';

// const OAuth = () => {
//     const navigate=useNavigate();
//     const dispatch=useDispatch();
//     const handleGoogleClick=async()=>{
//         try {
//             const provider=new GoogleAuthProvider();
//             const auth=getAuth(app);

//             const result=await signInWithPopup(auth,provider);
//             const res=await fetch('/api/auth/google',{
//                 method:"POST",
//                 headers:{
//                     'Content-Type':"application/json"
//                 },
//                 body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
//             })
//             const data=await res.json();
//             console.log(data);
//             if(data?.user){
//                 dispatch(signInSuccess(data?.user));
//                 navigate('/');
//             }
//         } catch (error) {
//             console.log('could not Sign with google');
//         }
//     }
//   return (
//     <button type="button" onClick={handleGoogleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue With Google</button>
//   )
// }

// export default OAuth
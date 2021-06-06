// import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useSelector, useDispatch } from 'react-redux';
// import { signupUser, userSelector, clearState } from './UserSlice';
// import { useHistory } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const Signup = () => {
//   const dispatch = useDispatch();
//   const { register, errors, handleSubmit } = useForm();
//   const history = useHistory();
//     // to access redux state component
//   const { isFetching, isSuccess, isError, errorMessage } = useSelector(
//     userSelector
//   );
//   const onSubmit = (data) => {
//     dispatch(signupUser(data));
//   };

//   useEffect(() => {
//     return () => {
//       dispatch(clearState());
//     };
//   }, []);

//   useEffect(() => {
//     if (isSuccess) {
//       dispatch(clearState());
//       history.push('/');
//     }

//     if (isError) {
//       toast.error(errorMessage);
//       dispatch(clearState());
//     }
//   }, [isSuccess, isError]);

//   return (
//     <Fragment>
//       <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div class="sm:mx-auto sm:w-full sm:max-w-md">
//           <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign Up to your account
//           </h2>
//         </div>
//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             <form
//               className="space-y-6"
//               onSubmit={handleSubmit(onSubmit)}
//               method="POST"
//             >
//                   <div className={classes.signUpHtm}>
//         <div className={classes.group}>
//           <label htmlFor="name" className={classes.label}>
//             Name:
//           </label>
//           <input type="text" {...register("name")} />
//         </div>
//         <div className={classes.group}>
//           <label htmlFor="user" className={classes.label}>
//             Surname
//           </label>
//           <input
//             type="text"
//             className={classes.input}
//             {...register("surname")}
//           />
//         </div>
//         <div className={classes.group}>
//           <label htmlFor="pass" className={classes.label}>
//             Email
//           </label>
//           <input
//             ctype="text"
//             className={classes.input}
//             {...register("email")}
//           />
//         </div>
//         <div className={classes.group}>
//           <label htmlFor="user" className={classes.label}>
//             Phone Number
//           </label>
//           <input
//             type="text"
//             className={classes.input}
//             {...register("phoneNumber")}
//           />
//         </div>
//         <div className={classes.group}>
//           <label htmlFor="pass" className={classes.label}>
//             Password
//           </label>
//           <input
//             type="password"
//             className={classes.input}
//             data-type="password"
//             {...register("password")}
//           />
//         </div>

//         <div className={classes.group}>
//           <input type="submit" className={classes.button} value="Sign Up" />
//         </div>
//       </div>
//             </form>
//             <div class="mt-6">
//               <div class="relative">
//                 <div class="relative flex justify-center text-sm">
//                   <span class="px-2 bg-white text-gray-500">
//                     Or <Link to="login"> Login</Link>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Signup;
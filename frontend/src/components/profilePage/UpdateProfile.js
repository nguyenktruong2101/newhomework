import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState, useEffect } from "react";



function UpdateProfile(props) {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  // const [user, setUser] = useState()
  // useEffect(() => {
  //   setUser(props.user)
  // }, [props.user])
  const validationSchema = Yup.object().shape({
    username: Yup.string().trim()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .max(15, 'Username must not exceed 15 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username must only contain letters, numbers, or "_"'),
    // email: Yup.string()
    //     .required('Email is required')
    //     .email('Email is invalid'),
    phoneNumber: Yup.string().trim()
      .min(7, 'Phone number must contains at least 7 digits')
      .max(11, 'Phone number must contains maximum 11 digits')
      .matches(/^[0-9]*/, 'Phone numbers can only contain numbers'),
    address: Yup.string().trim(),
    name: Yup.string().trim()
      .matches(/^(?![ ]+$)[a-zA-Z .]*$/, 'Name must only contain letters and space'),
    dateOfBirth: Yup.string().trim()
      .matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, 'DoB must match the format dd/mm/yyyy'),
    gender: Yup.string().trim()

    // password: Yup.string()
    //     .required('Password is required')
    //     .min(8, 'Password must be at least 8 characters')
    //     .max(40, 'Password must not exceed 40 characters')
    //     .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/, 'Password must contain at least one letter, one number, and one special character'),
    // confirmPassword: Yup.string()
    //     .required('Confirm Password is required')
    //     .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
});
const { register, unregister, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    // defaultValues: { username: user && user.username}
    shouldUnregister: true,
    shouldFocusError: false,
    mode: 'onSubmit'
});

const [returnMessage, setReturnMessage] = useState("")
const endPoint = `http://localhost:9000/user/`

const update = data => {
  console.log(data)
  console.log(currentUser)
  fetch(endPoint + `${currentUser.id}/update`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(data)
  }).then(response => response.json()).then(data => setReturnMessage(data.message))
};




  return (
    <>
      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <i class="fas fa-user-edit"></i>
      </button>

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Update your information
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <body class="bg-light" style={{paddingBottom: "2%"}}>
                <div class="container-fluid">
                  <main>
                    <div class="py-5 text-center">
                      <img class="d-block mx-auto mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                      <p class="lead">
                        {props.user.username}
                      </p>
                    </div>

                    <div class="row g-5">
                      <div class="col-12">
                        <form class="needs-validation" onSubmit={handleSubmit(update)} >
                          <div class="row g-3">
                            <div class="col-sm-6">
                              <label for="firstName" class="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                class={`form-control ${errors.name || returnMessage === "Username is already existed." ? 'is-invalid' : ''}`}
                                id="firstName"
                                placeholder="Your name"
                                defaultValue={`${props.user.name ? props.user.name : ''}`}  
                                {...register('name')} 
                              />
                            </div>

                            <div class="col-sm-6">
                              <label for="lastName" class="form-label">
                                DoB
                              </label>
                              <input
                                type="text"
                                class={`form-control ${errors.dateOfBirth || returnMessage === "Username is already existed." ? 'is-invalid' : ''}`}
                                id="DoB"
                                placeholder="dd/mm/yyyy"
                                defaultValue={`${props.user.dateOfBirth ? props.user.dateOfBirth : ''}`} 
                                {...register('dateOfBirth')} 
                              />
                              <div className="invalid-feedback"> {errors.dateOfBirth?.message}</div>

                            </div>

                            <div class="col-6">
                              <label for="username" class="form-label">
                                Username
                              </label>
                              <div class="input-group has-validation">
                                <span class="input-group-text">@</span>
                                <input
                                  type="text"
                                  class={`form-control ${errors.username || returnMessage === "Username is already existed." ? 'is-invalid' : ''}`}
                                  id="username"
                                  placeholder="Username"
                                  defaultValue={`${props.user.username ? props.user.username : ''}`}  
                                  {...register('username')} 
                                />
                                <div className="invalid-feedback">{returnMessage === "Username is already existed." && returnMessage} {errors.username?.message}</div>
                              </div>
                            </div>
                            <div class="col-6">
                              <label for="lastName" class="form-label">
                                Gender
                              </label>
                              <input
                                type="text"
                                class={`form-control ${errors.gender || returnMessage === "Username is already existed." ? 'is-invalid' : ''}`}
                                id="DoB"
                                placeholder="Your gender"
                                defaultValue={`${props.user.gender ? props.user.gender : ''}`} 
                                {...register('gender')} 
                              />
                              <div className="invalid-feedback"> {errors.gender?.message}</div>
                            </div>

                            <div class="col-12">
                              <label for="email" class="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="email"
                                placeholder="you@example.com"
                                defaultValue={`${props.user.email ? props.user.email : ''}`}
                                disabled
                                {...register('email')}
                              />
                              {console.log(props.user.email)}
                            </div>

                            <div class="col-7">
                              <label for="address" class="form-label">
                                Address
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="address"
                                placeholder="1234 Main St"
                                defaultValue={`${props.user.address ? props.user.address : ''}`}
                                {...register('address')} 
                              />
                            </div>

                            <div class="col-5">
                              <label for="Phone" class="form-label">
                                Phone number
                                <span class="text-muted">(Optional)</span>
                              </label>
                              <input
                                type="text"
                                class={`form-control ${errors.phoneNumber || returnMessage === "Username is already existed." ? 'is-invalid' : ''}`}
                                id="address2"
                                placeholder="Phone number"
                                defaultValue={`${props.user.phoneNumber ? props.user.phoneNumber : ''}`}
                                {...register('phoneNumber')} 
                              />
                              <div className="invalid-feedback"> {errors.phoneNumber?.message}</div>
                            </div>  
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button  class="btn btn-primary" type="submit" onClick={() => {
                              unregister("name", {keepDefaultValue: true});
                              unregister("dateOfBirth", {keepDefaultValue: true});
                              unregister("username", {keepDefaultValue: true});
                              unregister("address", {keepDefaultValue: true});
                              unregister("phoneNumber", {keepDefaultValue: true});
                              unregister("gender", {keepDefaultValue: true});
                            }  
                              }>
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </main>
                </div>
              </body>
            </div>
            
          </div>
        </div>
      </div>

    </>
  );
}

export default UpdateProfile;

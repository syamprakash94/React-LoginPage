import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./userEditor.css";
import axios from "axios";

function UserEditor() {
  var [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userId = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    trigger,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    const userInfo=localStorage.getItem("adminInfo")
    if(!userInfo){
      navigate("/admin");
    }


    axios
      .get(`/adminHome/edituser/${userId.userId}`)
      .then((resp) => {
        console.log(resp.data.name);
        setName(resp.data.name);
        setEmail(resp.data.email);
      })
      .catch((err) => {});
  }, []);
  
  const onSubmit = async (e) => {
  

    try {
      const confiq = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.patch(
        `/adminHome/editerUserDetails/${userId.userId}`,
        {
          name,
          email,
        },
        confiq
      );
      navigate('/adminHome')
     
      console.log("updatae",data);
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 mt-5">
            <div>
              <h3 className="text-center">EDIT</h3>
            </div>

          
              <div className="form-grop mt-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`form-control  ${errors.name && "invalid"}`}
                  placeholder="enter a name"
                  //   {...register("name", {
                  //     required: "Name is required",
                  //     pattern: {
                  //       value: /^[a-zA-Z]+$/,
                  //       message: "Only Contains Character",
                  //     },
                  //   })}
                  //   onKeyUp={() => {
                  //     trigger("name");
                  //   }}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
              </div>
              <label>Email</label>
              <div className="form-group">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  value={email}
                  className={`form-control  ${errors.email && "invalid"}`}
                  placeholder="enter your email"
                  //   {...register("email", {
                  //     required: "Email is required",
                  //     pattern: {
                  //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //       message: "invalid email address",
                  //     },
                  //   })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>

              {error && <div className="error_msg">{error}</div>}
              <div className="text-center">
                <button className="btn btn-primary mt-4" 
                 onClick={onSubmit
                  
                   
                }>
                  SIGNUP
                </button>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditor;

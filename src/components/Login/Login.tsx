import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "services/auth.service";
import { TLoginValues } from "model/User";

interface ILoginProps {
    
}

const Login:React.FC<ILoginProps> = (props) => {
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage]=useState<string>("");


    const initialValues : TLoginValues = {
        username:"",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("password is required")
    });

    const handleLogin = (formValue: TLoginValues) => {

        setMessage("");
        setIsLoading(true);
        login(formValue).then(() => {
            navigate("/profile");
        },
        (error) => {
            const resMessage = (error.response && error.response.data && error.response.message ) || error.message || error.toString();
            setIsLoading(false);
            setMessage(resMessage);
        }
        )

    }

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                />
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                    {isLoading && (
                    <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                </button>
                </div>
                {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                    {message}
                    </div>
                </div>
                )}
            </Form>
          </Formik>
        </div>
      </div>
    );
}

export default Login;
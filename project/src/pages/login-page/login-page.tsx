import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import {CLASSPATH_LOGO_FOOTER, CLASSPATH_LOGO_HEADER } from '../../const';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthData } from '../../types/user-data';
import { loginAction } from '../../store/api-actions';
import BlockUI from '../../components/block-UI/block-UI';
import { getDataUploadingStatus } from '../../store/app-data/app-data-selectors';

const loginEmailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,8}$/;

export default function LoginPage() : JSX.Element {

  const isUIBlocking = useAppSelector(getDataUploadingStatus);

  const [fieldErrors, setFieldErrors] = useState({
    loginField: 'Login must not be empty',
    passwordField: 'Password must not be empty'
  });

  const [isFieldUsed, setIsFieldUsed] = useState({
    loginField: false,
    passwordField: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [userData, setUserData] = useState({
    login: '',
    password: ''
  });

  useEffect(() => {
    if (fieldErrors.loginField || fieldErrors.passwordField) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [fieldErrors.loginField, fieldErrors.passwordField]);

  const loginBlurHandler = () => setIsFieldUsed({...isFieldUsed, loginField: true});

  const passwordBlurHandler = () => setIsFieldUsed({...isFieldUsed, passwordField: true});

  const dispatch = useAppDispatch();

  const loginChangeHandler = ({target}: ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, login: target.value});
    if (!loginEmailPattern.test(String(target.value).toLowerCase())) {
      setFieldErrors({...fieldErrors, loginField: 'Invalid Email'});
      if (!target.value) {
        setFieldErrors({...fieldErrors, loginField: 'Login must not be empty'});
      }
    } else {
      setFieldErrors({...fieldErrors, loginField: ''});
    }
  };

  const passwordChangeHandler = ({target}: ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, password: target.value});
    if (!passwordPattern.test(String(target.value).toLowerCase())) {
      setFieldErrors({...fieldErrors, passwordField: 'Your password must contain at least one latin letter and number and contain less then 9 characters long'});
      if (!target.value) {
        setFieldErrors({...fieldErrors, passwordField: 'Password must not be empty'});
      }
    } else {
      setFieldErrors({...fieldErrors, passwordField: ''});
    }
  };

  const isShowLoginError = isFieldUsed.loginField && fieldErrors.loginField;
  const isShowPasswordError = isFieldUsed.passwordField && fieldErrors.passwordField;

  const onSubmit = (authData: AuthData) => {
    if (isFormValid) {
      dispatch(loginAction(authData));
    }
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      login: userData.login,
      password: userData.password,
    });
  };

  return (
    <div className="user-page">
      <Helmet>
        <title>What to Watch. Login</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo classPath={CLASSPATH_LOGO_HEADER} />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitHandler}>
          {(isShowLoginError) && <div className='sign-in__message'><p>{fieldErrors.loginField}</p></div>}
          <div className="sign-in__fields">
            <div className={`sign-in__field ${isShowLoginError ? 'sign-in__field--error' : ''}`}>
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                value={userData.login}
                name="user-email"
                id="user-email"
                onBlur={loginBlurHandler}
                onChange={loginChangeHandler}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>

            <div className={`sign-in__field ${isShowPasswordError ? 'sign-in__field--error' : ''}`}>
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                value={userData.password}
                name="user-password"
                id="user-password"
                onBlur={passwordBlurHandler}
                onChange={passwordChangeHandler}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
            {(isShowPasswordError) && <div className='sign-in__message'><p>{fieldErrors.passwordField}</p></div>}
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              style={{
                borderColor: !isFormValid ? 'rgb(70, 70, 70)' : '',
                color: !isFormValid ? 'rgb(70, 70, 70)' : '',
                pointerEvents: !isFormValid ? 'none' : 'auto'
              }}
              disabled={!isFormValid}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <Logo classPath={CLASSPATH_LOGO_FOOTER}/>

        <div className="copyright">
          <p>© 2023 What to watch Ltd.</p>
        </div>
      </footer>

      {isUIBlocking ? <BlockUI /> : ''}
    </div>
  );
}

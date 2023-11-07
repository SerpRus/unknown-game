import {
  createContext,
  ReactElement,
  useContext,
  useMemo,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IAuthContext, IUser } from './types';
import { ISignUpData } from '../../../pages/RegistrationPage/ui/registrationPage';
import { ILoginDataFieldType } from '../../../pages/LoginPage/ui/loginPage';
import { USER_STORAGE_KEY } from './constants';
import AuthApi from '../../../shared/axios/AuthApi';

const authContext = createContext<IAuthContext>({} as IAuthContext);

export function ProvideAuth({ children }: { children: ReactElement }) {
  // @ts-ignore
  const storageUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
  const [user, setUser] = useState<IUser>(storageUser as IUser);
  const [isAuth, setIsAuth] = useState(!!storageUser);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false); // const history = useHistory();

  const checkIsAuth = async () => {
    try {
      setIsLoading(true);
      const response = await AuthApi.getUser();
      setIsLoading(false);
      setUser(response.data);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data));
      setIsAuth(true);
      return response.data;
    } catch (error) {
      setErrors([error]);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: Omit<ILoginDataFieldType, 'remember'>) => {
    try {
      setIsLoading(true);
      const response = await AuthApi.login(data);
      setIsLoading(false);
      setUser(response.data);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data));
      setIsAuth(true);
      toast.success('Вход выполнен');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = JSON.parse(err.request.response);
      setErrors([errorMessage]);
      toast.error(errorMessage?.reason);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthApi.logout();
      setIsLoading(false);
      setUser({} as IUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(null));
      setIsAuth(false);
      toast.success('Выполнен выход из системы');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = JSON.parse(err.request.response);
      setErrors([errorMessage]);
      toast.error(errorMessage?.reason);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: ISignUpData) => {
    try {
      setIsLoading(true);
      const response = await AuthApi.createUser(data);
      setIsLoading(false);
      // @ts-ignore
      this.checkIsAuth(); // eslint-disable-line
      setIsAuth(true);
      toast.success('Пользователь создан успешно');
      return response;
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = JSON.parse(err.request.response);
      setErrors([errorMessage]);
      toast.error(errorMessage?.reason);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuth,
      checkIsAuth,
      login,
      logout,
      signUp,
      errors,
      isLoading,
    }),
    [user, errors, isLoading, isAuth]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

import { RouteProps } from 'react-router-dom';
import Login from '../../../pages/LoginPage';
import RegistrationPage from '../../../pages/RegistrationPage';
import Home from '../../../pages/home';
import GamePage from '../../../pages/GamePage';
import { Leaderboard } from '../../../pages/Leaderboard';
import Forum from '../../../pages/Forum';
import Topic from '../../../pages/Forum/[id]';
import NotFound from '../../../pages/404Page';
import ServerErrorPage from '../../../pages/500Page';
import { ProfilePage } from '../../../pages/ProfilePage';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoutes {
  HOME = 'home',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  PROFILE = 'profile',
  GAME = 'game',
  LEADERBOARD = 'leaderboard',
  FORUM = 'forum',
  TOPIC = 'topic',
  NOT_FOUND = 'not_found',
  SERVER_ERROR = 'server_error',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTRATION]: '/registration',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.GAME]: '/game',
  [AppRoutes.LEADERBOARD]: '/leaderboard',
  [AppRoutes.FORUM]: '/forum',
  [AppRoutes.TOPIC]: '/forum/:id',
  [AppRoutes.SERVER_ERROR]: '/500',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <Home />,
    authOnly: true,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <Login />,
    authOnly: false,
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <RegistrationPage />,
    authOnly: false,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.GAME]: {
    path: RoutePath.game,
    element: <GamePage />,
    authOnly: true,
  },
  [AppRoutes.LEADERBOARD]: {
    path: RoutePath.leaderboard,
    element: <Leaderboard />,
    authOnly: true,
  },
  [AppRoutes.FORUM]: {
    path: RoutePath.forum,
    element: <Forum />,
    authOnly: true,
  },
  [AppRoutes.TOPIC]: {
    path: RoutePath.topic,
    element: <Topic />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFound />,
    authOnly: undefined,
  },
  [AppRoutes.SERVER_ERROR]: {
    path: RoutePath.server_error,
    element: <ServerErrorPage />,
    authOnly: undefined,
  },
};

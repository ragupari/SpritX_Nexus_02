import {
  UserCircleIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  CursorArrowRaysIcon,
  TrophyIcon,
  UserGroupIcon,
  UsersIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Players, Team, SelectYourTeam, Notifications, LeaderBoard, Budget } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [   
      {
        icon: <UsersIcon {...icon} />,
        name: "team",
        path: "/team",
        element: <Team />,
      },

      {
        icon: <UserGroupIcon {...icon} />,
        name: "players",
        path: "/players",
        element: <Players />,
      },
      {
        icon: <CursorArrowRaysIcon {...icon} />,
        name: "Select Your Team",
        path: "/selectyourteam",
        element: <SelectYourTeam />,
      },

      {
        icon: <TrophyIcon {...icon} />,
        name: "leaderboard",
        path: "/leaderboard",
        element: <LeaderBoard />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "budget",
        path: "/budget",
        element: <Budget />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;

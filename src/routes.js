import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Ringtone from "views/admin/ringtoneManagement";
import College from "views/admin/collegeManagement";
import CourseManagement from "views/admin/courseManagement";
import Commission from "views/admin/commission";
import Referral from "views/admin/referralCodeManagement";
import UserManagement from "views/admin/userManagement";
import RoleManagement from "views/admin/roleManagement";
import SupportManagement from "views/admin/supportManagement";
import Logout from "views/admin/settings/logout";
import PasswordChange from "views/admin/settings/passwordChange";
import PrivacyPolicy from "views/admin/settings/privacyPolicy";
import AddProblem from "views/admin/supportManagement/components/AddProblem";
import UserProblem from "views/admin/supportManagement/components/UserProblem";
import TermsAndConditions from "views/admin/settings/termsAndConditionsManagement";
import TradingRulesManagement from "views/admin/tradingRulesManagement";
import Stages from "views/admin/stages"
import InfluencerManagement from "views/admin/influencerManagement"
import FaqManagement from "views/admin/faqManagement";
import NFTMarketplace from "views/admin/marketplace";
import IpTracking from "views/admin/ipTracking";
import LoginTracking from "views/admin/loginTracking";
import AccountTypeManagement from "../src/views/admin/accountTypeManagement";
import Profile from "views/admin/profile";
import ForgotPassword from "../src/views/auth/forgotPassword"
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdPrivacyTip,
  MdBarChart,
  MdPerson,
  MdLock,
  MdOutlineAccountTree,
  MdSupportAgent,
  MdLocationPin,
  MdOutlinePublishedWithChanges,
  MdLogout,
  MdOutlineReportProblem
} from "react-icons/md";
import {
  FaRegUserCircle,
  FaPhotoVideo,
  FaDollarSign,
  FaQuestion,
} from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import { RiProfileLine } from "react-icons/ri";
import { IoSchoolSharp, IoMusicalNotes } from "react-icons/io5";
import { FaShareFromSquare ,FaStairs} from "react-icons/fa6";
import { RiStockLine } from "react-icons/ri";
import { SiInfluxdb } from "react-icons/si";
import { TbAirConditioning } from "react-icons/tb";
import { VscDebugBreakpointConditionalUnverified } from "react-icons/vsc";
// import { FaDollarSign } from "react-icons/fa";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "User Management",
    layout: "/admin",
    path: "userManagement",
    icon: <FaRegUserCircle className="h-6 w-6" />,
    component: <UserManagement />,
    secondary: true,
  },
  {
    name: "Role Management",
    layout: "/admin",
    path: "roleManagement",
    icon: <RiProfileLine className="h-6 w-6" />,
    // component: <NFTMarketplace />,
    component: <RoleManagement />,
    secondary: true,
  },
  {
    name: "College Management",
    layout: "/admin",
    path: "collegeManagement",
    icon: <IoSchoolSharp className="h-6 w-6" />,
    component: <College />,
    secondary: true,
  },

  {
    name: "Account Type Management ",
    layout: "/admin",
    path: "accountTypeManagement",
    icon: <MdOutlineAccountTree className="h-6 w-6" />,
    component: <AccountTypeManagement />,
    secondary: true,
  },
  {
    name: "Stages",
    layout: "/admin",
    path: "stages",
    icon: <FaStairs className="h-6 w-6" />,
    component: <Stages />,
    secondary: true,
  },
  {
    name: "Influencer Management",
    layout: "/admin",
    path: "influencerManagement",
    icon: <SiInfluxdb className="h-6 w-6" />,
    component: <InfluencerManagement />,
    secondary: true,
  },
  {
    name: "Commission Categories",
    layout: "/admin",
    path: "commissionCategories",
    icon: <FaDollarSign className="h-6 w-6" />,
    component: <Commission />,
    secondary: true,
  },
  {
    name: "Course Management",
    layout: "/admin",
    path: "courseManagement",
    icon: <FaPhotoVideo className="h-6 w-6" />,
    component: <CourseManagement />,
    secondary: true,
  },

  {
    name: "Ringtone Management",
    layout: "/admin",
    path: "ringtoneManagement",
    icon: <IoMusicalNotes className="h-6 w-6" />,
    component: <Ringtone />,
    secondary: true,
  },

  {
    name: "Referral Code Management",
    layout: "/admin",
    path: "referralCodeManagement",
    icon: <FaShareFromSquare className="h-6 w-6" />,
    component: <Referral />,
    secondary: true,
  },
  
  
  {
    name: "Trading Rules Management",
    layout: "/admin",
    path: "tradingRulesManagement",
    icon: <RiStockLine className="h-6 w-6" />,
    component: < TradingRulesManagement/>,
    secondary: true,
  },
  
  {
    name: "FAQ Management",
    layout: "/admin",
    icon: <FaQuestion className="h-6 w-6" />,
    path: "faqManagement",
    component: <FaqManagement />,
    secondary: true,
    
  },
  {
    name: "Login Tracking",
    layout: "/admin",
    icon: <MdLocationPin className="h-6 w-6" />,
    path: "login-tracking",
    component: <LoginTracking />,
  },
  {
    name: "IP Tracking",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "ip-tracking",
    component: <IpTracking />,
  },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  {
    name: "Support Management",
    layout: "/admin",
    path: "supportManagement",
    icon: <MdSupportAgent className="h-6 w-6" />,
    children: [
      {
        paths: "typeOfProblem",
        name: "Types of Problem",
        component: <AddProblem />,
        icon:<MdOutlineReportProblem/>
      },
      {
        paths: "userProblem",
        name: "User Problem Statistics",
        component: <UserProblem />, 
        icon:<BiSolidUserDetail/>
      },
    ],
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "settings",
    icon: <MdLock className="h-6 w-6" />,
    component: <Profile />,
    children: [
      {
        name: "Password Change",
        layout: "/admin",
        paths: "password-changes",
        icon: <MdOutlinePublishedWithChanges className="h-6 w-6" />,
        component: <PasswordChange />,
      },
      
      {
        name: "Terms and Conditions",
        layout: "/admin",
        paths: "termsAndConditions",
        icon: <TbAirConditioning className="h-6 w-6" />,
        component: <TermsAndConditions />,
      },
      {
        name: "Privacy Policy ",
        layout: "/admin",
        paths: "privacyPolicy",
        icon: <MdPrivacyTip className="h-6 w-6" />,
        component: <PrivacyPolicy />,
      },
      {
        name: "Logout",
        layout: "/admin",
        paths: "logout",
        icon: <MdLogout className="h-6 w-6 " />,
        component: <Logout />,
      },
    
      // {
      //   paths: "userProblem",
      //   name: "User Problem Statistics",
      //   component: <UserProblem />, 
      //   icon: <MdLock className="h-6 w-6" />,
      // },
    ],
  },
  {
    name: "Settings",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    hidden: true,
  },
  {
    name: "Forgot Password",
    layout: "/auth",
    path: "/admin-forgot-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgotPassword />, // Create this component
    hidden: true, // Hide from sidebar
  }
  
  
  
];
export default routes;

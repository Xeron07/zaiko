/**
 * /*!
 *
 * =========================================================
 * Black Dashboard React v1.1.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/black-dashboard-react
 * Copyright 2020 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)
 *
 * Coded by Creative Tim
 *
 * =========================================================
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * @format
 */

import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Sell from "views/sells/Sell.js";
import Purchase from "views/purchases/Purchase.js";
import Storage from "./views/storages/Storage.js";
import Client from "./views/clients/Client.js";
import Expense from "./views/expenses/Expense.js";
import Transection from "./views/transections/trans.js";
import SingleExpense from "./views/expenses/singleExpense.js";
import Loss from "./views/loss/loss.js";
import Cost from "./views/dashboard/cost.js";
import Report from "./views/report/report.js";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/report",
    name: "Report",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-bar-32",
    component: Report,
    layout: "/admin",
  },
  {
    path: "/cost",
    name: "Monthly Cost Data",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-coins",
    component: Cost,
    layout: "/admin",
  },
  {
    path: "/transection",
    name: "Transections",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-money-coins",
    component: Transection,
    layout: "/admin",
  },
  {
    path: "/sell",
    name: "Sell Product",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-basket-simple",
    component: Sell,
    layout: "/admin",
  },
  {
    path: "/purchase",
    name: "Purchase Product",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-cart",
    component: Purchase,
    layout: "/admin",
  },
  {
    path: "/storage",
    name: "Storage data",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-bag-16",
    component: Storage,
    layout: "/admin",
  },
  {
    path: "/client",
    name: "Client data",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-satisfied",
    component: Client,
    layout: "/admin",
  },
  {
    path: "/expense",
    name: "Expense data",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-bus-front-12",
    component: Expense,
    layout: "/admin",
  },
  {
    path: "/loss",
    name: "Add Loss",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-trash-simple",
    component: Loss,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/map",
  //   name: "Map",
  //   rtlName: "خرائط",
  //   icon: "tim-icons icon-pin",
  //   component: Map,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl"
  // }
];
export default routes;

import React, { useEffect, useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Index";
import Login from "./pages/Login/index";
import ActivatePage from "./pages/Home/ActivatePage";
import LoginUser from "./privateRouter/LoginUser";
import NotLoginUser from "./privateRouter/NotLoginUser";
import RootLayOut from "./component/RootLayOut/RootLayOut";
import "swiper/css";
import FrogetPassword from "./component/authentication/FrogetPassword";
import CreatePostPopUp from "./component/HomeComponent/CenterPart/CreatePostPopUp";
import Profile from "./pages/UserProfile/Profile";
import { useGetAllPostsQuery } from "./feature/api/authApi";
import "react-loading-skeleton/dist/skeleton.css";
import Friends from "./pages/friends";
import NotFound from "./pages/notFound";
import { useSelector } from "react-redux";

function App() {
  const [createPostShow, setCreatePostShow] = useState(false);

  const { data: allpostData } = useGetAllPostsQuery();

  const themeMode = useSelector((state) => state?.thememode?.mode);
  useEffect(() => {
    if (themeMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [themeMode]);

  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoginUser />}>
          <Route element={<RootLayOut />}>
            <Route
              path="/"
              element={
                <Home
                  setCreatePostShow={setCreatePostShow}
                  allpostData={allpostData}
                />
              }
            />
            <Route path="/active/:token" element={<ActivatePage />} />
            <Route
              path="/profile/:username"
              element={
                <Profile
                  allpostData={allpostData}
                  setCreatePostShow={setCreatePostShow}
                />
              }
            />
            <Route path="/friends" element={<Friends />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* not login user is below */}
        <Route element={<NotLoginUser />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/forget" element={<FrogetPassword />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_skipActionErrorRevalidation: true,
        v7_partialHydration: true,
        v7_normalizeFormMethod: true,
        v7_fetcherPersist: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  return (
    <>
      {createPostShow && (
        <CreatePostPopUp
          setCreatePostShow={setCreatePostShow}
          createPostShow={createPostShow}
        />
      )}
      <RouterProvider
        router={route}
        future={{
          v7_startTransition: true,
        }}
      />
    </>
  );
}

export default App;

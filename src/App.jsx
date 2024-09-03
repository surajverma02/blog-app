import { useEffect, useState } from "react";
import { Header, Footer, Logo } from "./components";
import { useDispatch } from "react-redux";
import authService from "./services/auth";
import { login, logout } from "./stores/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen content-between bg-[#F5F5F5]">
      <div className="w-full min-h-screen flex flex-col justify-between">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <Logo width="500px" />
      <p className="font-bold text-6xl text-black">Loading</p>
    </div>
  );
}

export default App;

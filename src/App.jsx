import { useEffect, useState } from "react";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import authService from "./services/auth";
import { login, logout } from "./stores/authSlice";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
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
    <div className="min-h-screen flex flex-wrap content-between bg-slate-400">
      <div className="w-full block">
        <Header />
        <main>
           <Outlet />
          </main>
        <Footer />
      </div>
    </div>
  ) : (
    <p className="font-semibold text-6xl">Loading</p>
  );
}

export default App;

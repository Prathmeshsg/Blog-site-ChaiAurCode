import { useEffect, useState } from "react"
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App(){
  
   const[loading,setLoading]=useState(true);
   const dispatch=useDispatch();

  
  //  useEffect(()=>{
  //     authService.getCurrentUser()
  //     .then((userData)=>{
  //       if(userData){
  //           dispatch(login({userData}))
  //       }
  //       else{
  //           dispatch(logout())
  //       }
  //     }).finally(()=>setLoading(false))
  //  },[])
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to trigger re-render

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                    setIsLoggedIn(true); // Update state to trigger re-render
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [dispatch]);
  return !loading ? (
    <div className="min-h-screen flex flex-col bg-custom-gradient">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}
   




export default App

import { useContext} from 'react'

import {Link, useNavigate} from 'react-router-dom'
import Logo from '../../Assets/Images/freshcart-logo.svg'
import { UserToken } from '../../Context/Token';


export default function Navbar() {

    const {token,setToken} = useContext(UserToken);
    const {userName} = useContext(UserToken);




    const navigate = useNavigate()

    function signOut(){
        localStorage.removeItem('userToken')
        localStorage.removeItem('userName')
        setToken(null)
        navigate('/signIn')
    }

  return <>
  <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to=""><img src={Logo} alt="" /></Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
    
            <ul className="navbar-nav mx-auto mt-2 mt-lg-0 d-flex flex-wrap">
                <li className="nav-item">
                    <Link className="nav-link active" to='/' aria-current="page">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='cart'>Cart</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='products'>Products</Link>
                </li>
                {token ? <>
                <li className="nav-item">
                    <Link className="nav-link" to='wishlist'>Wish List</Link>
                </li>
                </> : null}
                <li className="nav-item">
                    <Link className="nav-link" to='categories'>Categories</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='brands'>Brands</Link>
                </li>
            </ul>
    
  {/* <i className="fa-brands fa-instagram mx-1"></i>
                <i className="fa-brands fa-facebook-f mx-1"></i>
                <i className="fa-brands fa-tiktok mx-1"></i>
                <i className="fa-brands fa-twitter mx-1"></i>
                <i className="fa-brands fa-linkedin mx-1"></i>
                <i className="fa-brands fa-youtube mx-1"></i> */}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex align-items-center flex-wrap">
             
                {token ? <> 
                 <Link to='/cart'>
               <li className="nav-item position-relative mx-4">
              
                <i className="fa-solid fa-cart-shopping text-main fs-4"></i>

                </li></Link> 
                    <li className="nav-item">
                    <span role='button' onClick={signOut} className="nav-link">SignOut</span>
                </li> 
                <li className="nav-item">
                    <span className="nav-link">{`Hello ${userName}`}</span>
                </li>
                 </>  : <>
           
                <li className="nav-item">
                    <Link className="nav-link" to='signIn'>SignIn</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='register'>Register</Link>
                </li>
                </>
              }
               
        
            </ul>
        
        
        </div>
    </div>
  </nav>
  
  </>
}
    
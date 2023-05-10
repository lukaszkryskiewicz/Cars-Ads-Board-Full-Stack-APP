import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${API_URL}/auth/logout`, options)
      .then(res => {
        if (res.status === 200) {
          dispatch(logOut());
          navigate('/');
        } else {
          throw new Error('Logout failed')
        }
      })
      .catch(err => {
        console.log(err)
      });

  }, [dispatch]);



  return null
}

export default Logout
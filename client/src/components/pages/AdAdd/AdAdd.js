
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addAdRequest } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import AdForm from '../../features/AdForm/AdForm'


const AdAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser)

  const handleSubmit = (ad) => {
    ad.append('date', new Date().toLocaleDateString('en-GB'))
    dispatch(addAdRequest(ad))
    navigate('/')
  }


  return (<div className='col-11 col-sm-7 mx-auto'>
    <h1 className='my-4'>New Ad</h1>
    {user === null && <p>You must be logged in</p>}
    {user && <AdForm action={handleSubmit} />}
  </div>
  )
}

export default AdAdd;
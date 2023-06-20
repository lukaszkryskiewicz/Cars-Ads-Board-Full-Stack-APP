import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { editAdRequest, getAdById } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import AdForm from '../../features/AdForm/AdForm'
import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';


const AdEdit = () => {
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams();
  const currentAd = useSelector(state => getAdById(state, id));
  const dispatch = useDispatch();
  const user = useSelector(getUser)

  const handleSubmit = async (ad) => {
    ad.append('date', currentAd.date)
    try {
      await dispatch(editAdRequest(id, ad));
      setStatus('success');
      setTimeout(() => {
        navigate('/ad/' + id);
      }, 2000)
    } catch (error) {
      setStatus('error')
    }
  }

  const handleCancel = () => {
    navigate('/ad/' + id);
  }

  if (!currentAd) {
    return <div>Loading...</div>;
  }


  return (<div className='col-11 col-sm-7 mx-auto'>
    <div className='d-flex justify-content-between align-items-center'>
      <h1 className='my-4'>Edit Ad</h1>
      <Button className='h-100' variant="dark" type='button' onClick={handleCancel}>
        Go back
      </Button>
    </div>
    {status === 'success' && (<Alert variant='success'>
      <Alert.Heading>Success!</Alert.Heading>
      <p>Ad edited successfully!</p>
    </Alert>
    )}

    {status === 'error' && (<Alert variant='danger'>
      <Alert.Heading>Incorrect data</Alert.Heading>
      <p>Something went wrong! Please check data or upload other photo</p>
    </Alert>
    )}
    {user === null && <p>You must be logged in</p>}
    {(user && user !== currentAd.seller.login) && <p>You cannot edit this ad</p>}
    {(user && user === currentAd.seller.login) && <AdForm action={handleSubmit} adInfo={currentAd} />}
  </div>
  )
}

export default AdEdit;
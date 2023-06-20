
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addAdRequest } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import AdForm from '../../features/AdForm/AdForm'
import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';


const AdAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (ad) => {
    ad.append('date', new Date().toLocaleDateString('en-GB'))
    try {
      await dispatch(addAdRequest(ad))
      setStatus('success');
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error) {
      setStatus('error')
    }
  }

  const handleCancel = () => {
    navigate('/');
  }


  return (<div className='col-11 col-sm-7 mx-auto'>
    <div className='d-flex justify-content-between align-items-center'>
      <h1 className='my-4'>New Ad</h1>
      <Button className='h-100' variant="dark" type='button' onClick={handleCancel}>
        Go back
      </Button>
    </div>
    {status === 'success' && (<Alert variant='success'>
      <Alert.Heading>Success!</Alert.Heading>
      <p>Ad added successfully!</p>
    </Alert>
    )}

    {status === 'error' && (<Alert variant='danger'>
      <Alert.Heading>Incorrect data</Alert.Heading>
      <p>Something went wrong! Please check data or upload other photo</p>
    </Alert>
    )}
    {user === null && <p>You must be logged in</p>}
    {user && <AdForm action={handleSubmit} />}
  </div>
  )
}

export default AdAdd;
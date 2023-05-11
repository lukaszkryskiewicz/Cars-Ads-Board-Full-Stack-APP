import AdForm from '../../features/AdForm/AdForm'
import { Alert, Spinner } from "react-bootstrap";
import { useState } from 'react'


const AdAdd = () => {
  const [status, setStatus] = useState(null)


  return (<div className='col-12 col-sm-5 mx-auto'>
    <h1 className='my-4 mx-auto'>New Ad</h1>
    {status === 'success' && (<Alert variant='success'>
      <Alert.Heading>Success!</Alert.Heading>
      <p>You have successfuly add new advert!</p>
    </Alert>
    )}

    {status === 'serverError' && (<Alert variant='danger'>
      <Alert.Heading>Something went wrong!</Alert.Heading>
      <p>Unexpected error. Please try again!</p>
    </Alert>
    )}

    {status === 'clientError' && (<Alert variant='danger'>
      <Alert.Heading>Not enough data</Alert.Heading>
      <p>Please fill all the required fields</p>
    </Alert>
    )}

    {status === 'loading' && (<Spinner animation="border" role='status' className='block mx-auto'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
    )}

    <AdForm statusInfo={setStatus} />

  </div>
  )
}

export default AdAdd;
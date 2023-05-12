import { useDispatch } from 'react-redux'
import { addAdRequest } from '../../../redux/adsRedux';
import AdForm from '../../features/AdForm/AdForm'


const AdAdd = () => {
  const dispatch = useDispatch();

  const handleSubmit = (ad) => {
    ad.append('date', new Date().toLocaleDateString('en-GB'))
    console.log(ad)
    dispatch(addAdRequest(ad))
  }


  return (<div className='col-12 col-sm-5 mx-auto'>
    <h1 className='my-4'>New Ad</h1>
    <AdForm action={handleSubmit} />
  </div>
  )
}

export default AdAdd;
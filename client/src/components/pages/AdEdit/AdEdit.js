import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { editAdRequest, getAdById } from '../../../redux/adsRedux';
import AdForm from '../../features/AdForm/AdForm'


const AdEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const currentAd = useSelector(state => getAdById(state, id));
  const dispatch = useDispatch();

  const handleSubmit = (ad) => {
    ad.append('date', currentAd.date)
    dispatch(editAdRequest(id, ad))
    navigate('/')
  }

  if (!currentAd) {
    return <div>Loading...</div>;
  }
  console.log(currentAd)


  return (<div className='col-12 col-sm-5 mx-auto'>
    <h1 className='my-4'>Edit Ad</h1>
    <AdForm action={handleSubmit} adInfo={currentAd} />
  </div>
  )
}

export default AdEdit;
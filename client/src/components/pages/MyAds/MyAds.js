import { Row } from "react-bootstrap";
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { useSelector } from "react-redux";
import { getUsersAds } from "../../../redux/adsRedux";
import { getUser } from "../../../redux/usersRedux";


const MyAds = () => {
  const user = useSelector(getUser)
  const ads = useSelector(state => getUsersAds(state, user));

  if (!ads) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Row className='justify-content-between align-items-center'>
        <h1 className='col-md-auto col-12 text-center'>My Ads</h1>
      </Row>
      {ads?.length > 0 ?
        <AdsGrid ads={ads} /> :
        user ? <p>You don't have any ads</p> : <p>Please sing in first!</p>}
    </>
  )
}

export default MyAds;
import { Row } from "react-bootstrap";
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { useSelector } from "react-redux";
import { getUsersAds } from "../../../redux/adsRedux";
import { useParams } from "react-router-dom";


const UserAds = () => {
  const { sellerId } = useParams();
  const ads = useSelector(state => getUsersAds(state, sellerId));

  if (!ads) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Row className='justify-content-between align-items-center'>
        <h1 className='col-md-auto col-12 text-center'>User {sellerId} Ads</h1>
      </Row>
      {ads?.length > 0 ?
        <AdsGrid ads={ads} /> :
        sellerId && <h2>{sellerId} don't have any ads</h2>}
    </>
  )
}

export default UserAds;
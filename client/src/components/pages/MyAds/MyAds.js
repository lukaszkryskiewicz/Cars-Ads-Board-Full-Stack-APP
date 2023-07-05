import { Row, Spinner } from "react-bootstrap";
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { useSelector } from "react-redux";
import { getUsersAds } from "../../../redux/adsRedux";
import { getUser, getUserStatus } from "../../../redux/usersRedux";


const MyAds = () => {
  const user = useSelector(getUser)
  const userStatus = useSelector(getUserStatus)
  const ads = useSelector(state => getUsersAds(state, user));

  console.log(Boolean(user), (userStatus))

  if (!ads) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Row className='justify-content-between align-items-center'>
        <h1 className='col-md-auto col-12 text-center'>My Ads</h1>
      </Row>
      {userStatus?.pending === true &&
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
      {(!user && userStatus.error !== null) &&
        <h2>Please sign in first</h2>}
      {(user && ads.length > 0) &&
        <AdsGrid ads={ads} />}
      {(user && ads.length === 0) &&
        < h2 > You don't have any ads</h2>}
    </>
  )
}

export default MyAds;
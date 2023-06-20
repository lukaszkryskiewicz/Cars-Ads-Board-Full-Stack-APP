import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllAdsByNewest } from "../../../redux/adsRedux";
import SearchBar from "../../features/SearchBar/SearchBar";


const Home = () => {
  const ads = useSelector(getAllAdsByNewest);

  return (<>
    <Row className='justify-content-between align-items-center'>
      <h1 className='col-md-auto col-12 text-center'>Car Advertising Board</h1>
      <SearchBar />
    </Row>
    <AdsGrid ads={ads} />
  </>
  )
}

export default Home;
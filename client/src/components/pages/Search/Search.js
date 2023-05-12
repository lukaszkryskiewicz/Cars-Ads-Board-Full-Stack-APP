import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { useSelector } from "react-redux";
import { searchAdByTitle } from "../../../redux/adsRedux";


const Search = () => {
  const { searchPhrase } = useParams();
  const filteredAds = useSelector(state => searchAdByTitle(state, searchPhrase))

  return (
    <>
      <Row className='justify-content-between align-items-center'>
        <h1>Search results for : {searchPhrase}</h1>
      </Row>
      <AdsGrid ads={filteredAds} />
    </>
  )
}

export default Search;
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { useSelector } from "react-redux";
import { searchAdByTitle } from "../../../redux/adsRedux";
import SearchBar from "../../features/SearchBar/SearchBar";


const Search = () => {
  const { searchPhrase } = useParams();
  const filteredAds = useSelector(state => searchAdByTitle(state, searchPhrase))

  return (
    <>
      <Row className='justify-content-between align-items-center'>
        <h1 className='col-md-auto col-12 text-center'>Search results for : {searchPhrase}</h1>
        <SearchBar />
      </Row>
      <AdsGrid ads={filteredAds} />
    </>
  )
}

export default Search;
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import { loadAdsRequest } from "../../../redux/adsRedux";


const AdForm = ({ statusInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('')


  const handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('title', title);
    fd.append('address', address);
    fd.append('price', price);
    fd.append('content', content);
    fd.append('image', image);
    fd.append('date', new Date().toLocaleDateString('en-GB'));

    const options = {
      method: 'POST',
      body: fd,
      credentials: 'include'
    }

    statusInfo('loading')
    fetch(`${API_URL}/api/ads`, options)
      .then(res => {
        if (res.status === 200) {
          statusInfo('success');
          dispatch(loadAdsRequest())
          setTimeout(() => {
            navigate('/')
          },
            2000
          )
        } else if (res.status === 400) {
          statusInfo('clientError')
        } else {
          statusInfo('serverError')
        }
      })
      .catch(err => {
        statusInfo('serverError')
        console.log(err)
      })
  }

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className='mb-3' controlId='formTitle'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formAddress'>
        <Form.Label>Address</Form.Label>
        <Form.Control type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter address' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPrice'>
        <Form.Label>Price</Form.Label>
        <Form.Control type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter price' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formContent'>
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={5} value={content} onChange={(e) => setContent(e.target.value)} />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formFile'>
        <Form.Label>Photo</Form.Label>
        <Form.Control type='file' onChange={(e) => setImage(e.target.files[0])} />
      </Form.Group>

      <Button variant="primary" type='submit'>
        Submit
      </Button>

    </Form>
  )
}

export default AdForm;


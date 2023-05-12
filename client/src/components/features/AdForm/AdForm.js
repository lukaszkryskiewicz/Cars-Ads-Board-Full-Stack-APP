import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const AdForm = ({ action, adInfo }) => {
  const [title, setTitle] = useState(adInfo?.title || '');
  const [address, setAddress] = useState(adInfo?.address || '');
  const [price, setPrice] = useState(adInfo?.price || '');
  const [content, setContent] = useState(adInfo?.content || '');
  const [image, setImage] = useState('')

  const schema = yup.object({
    title: yup.string().min(10, 'Title must have at least 10 characters')
      .max(50, 'Title must have less than 50 characters')
      .required('Title is required'),
    address: yup.string().required('Address is required'),
    price: yup.number().required('Price is required').typeError('Price must be a number'),
    content: yup.string().min(20, 'Content must have at least 20 characters')
      .max(100, 'Content must have less than 100 characters')
      .required('Content is required'),
    image: yup.mixed()
      .test('fileType', 'Invalid file type. Only .jpg, .png or .gif files are allowed', (value) => {
        if (value.length === 0) return true;
        const fileType = value[0].type;
        return fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif';
      })
      .test('fileSize', 'File size is too big. Maximum allowed size is 1MB', (value) => {
        if (value.length === 0) return true;
        return value[0].size <= 1048576;
      }),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = () => {

    const fd = new FormData();
    fd.append('title', title);
    fd.append('address', address);
    fd.append('price', price);
    fd.append('content', content);
    console.log(Boolean(image))
    if (image) {
      fd.append('image', image);
    }
    action(fd)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <Form.Group className='mb-3' controlId='formTitle'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' {...register('title')} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' />
        <Form.Text className='text-danger'>{errors.title?.message}</Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formAddress'>
        <Form.Label>Address</Form.Label>
        <Form.Control type='text' {...register('address')} value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter address' />
        <Form.Text className='text-danger'>{errors.address?.message}</Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPrice'>
        <Form.Label>Price</Form.Label>
        <Form.Control type='text' {...register('price')} value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter price' />
        <Form.Text className='text-danger'>{errors.price?.message}</Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formContent'>
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" {...register('content')} rows={5} value={content} onChange={(e) => setContent(e.target.value)} />
        <Form.Text className='text-danger'>{errors.content?.message}</Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formFile'>
        <Form.Label>Photo</Form.Label>
        <Form.Control type='file'  {...register('image')} onChange={(e) => setImage(e.target.files[0])} />
        <Form.Text className='text-danger'>{errors.image?.message}</Form.Text>
      </Form.Group>

      <Button variant="primary" type='submit'>
        Submit
      </Button>

    </Form>
  )
}

export default AdForm;


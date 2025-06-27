import Message from './components/Message';

const Project4 = () => {
  const dev1 = {
    senderName: 'Developer',
    pfp: 'https://res.cloudinary.com/dropplk9o/image/upload/v1750301291/shadow.jpg',
    text: `Halo siapapun itu, ini web full stack pertamaku, Asal jadi aja dulu lah ya. karena gak bakal terus di develop mungkin bakalan ada hal yang gak fungsi. so thanks for visiting and see you in the next web 🙌 👋`,
    time: '25.17',
    isReceiver: false
  }
  const dev2 = {
    senderName: 'Developer',
    pfp: 'https://res.cloudinary.com/dropplk9o/image/upload/v1750301291/shadow.jpg',
    text: <>
      Contact me:    
      <a href='https://wa.me/6281585680953' style={{color: 'blue'}}> WhatsApp</a> 
      <br />
      Follow Me: 
      <a href='https://getmimo.com/invite/sp0uyk' style={{color: 'blue'}}> Mimo</a> 
    </>,
    time: '25.17',
    isReceiver: false
  }
  return (
    <>
      <Message field={dev1} />
      <Message field={dev2} />
    </>
  )
}

export default Project4;
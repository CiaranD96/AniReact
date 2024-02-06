const AboutTab = ({ description, trailer }) => {
  return (
    <div className='tab-container'>
      <section className='trailer-container'>
        <iframe
          src={trailer + '?mute=1'}
          title='trailer'
          className='trailer'
        ></iframe>
      </section>

      <section className='description-container'>{description}</section>
    </div>
  );
};

export default AboutTab;

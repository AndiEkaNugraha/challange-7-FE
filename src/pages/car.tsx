import {Container, Image, Col, Spinner} from 'react-bootstrap';
import ImageCar from '../assets/car.png'
import { ChangeEvent, useEffect, useState } from 'react';
import { useCars } from '../context/carsContext';

export default function Car() {
   const { cars, fetchCars, loading, error } = useCars();
   const [filters, setFilters] = useState({driverType:'', rentalTime:'', passengerCount:''});
   const [tempFilters, setTempFilters] = useState({driverType:'', rentalTime:'', passengerCount:''});
   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
   const [hasError, setHasError] = useState(false);

   useEffect(() => {
      fetchCars(filters);
    }, [filters]);

    useEffect(() => {
      const { driverType, date, time, passengerCount } = tempFilters;
      const rentalTime = date && time ? `${date}T${time}` : '';
      setIsButtonDisabled(!(driverType && rentalTime));
    }, [tempFilters]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setTempFilters({
        ...tempFilters,
        [name]: value
      });
    };
  
    const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const dateTime = tempFilters.date && tempFilters.time ? `${tempFilters.date}T${tempFilters.time}` : '';
      setFilters({
        driverType: tempFilters.driverType,
        rentalTime: dateTime,
        passengerCount: tempFilters.passengerCount
      });
      console.log("Filters applied:", { driverType: tempFilters.driverType, dateTime: dateTime, passengerCount: tempFilters.passengerCount });
    };
  

    const HeroSection = () => (
      <section>
            <Container fluid id='hero__home' className='align-content-center pb-4 pb-lg-0'>
               <Container className='hero__content'>
                  <Col lg={6} className='gap-3 d-grid pe-4'>
                  <h1>Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)</h1>
                  <p className='col-lg-10'>Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.</p>
                  </Col>
               </Container>
               <Col lg={6} className='ms-auto text-end overflow-hidden d-none d-lg-block pt-4'>
                  <Image src={ImageCar} alt="car" className='car'/>
                  <div className='car-background'></div>
                </Col>
            </Container>
         </section>
    )
    const FilterSection = () => (
      <section className="container px-4">
      <div id="form__filter-cars" className="d-flex p-4 mx-sm-5 shadow rounded-3 border">
        <div className="d-lg-flex col-12 gap-3 align-items-end d-grid">
          <div className="col">
            <div>Tipe Driver</div>
            <select
              className="form-select rounded-1 mt-1 border"
              name="driverType"
              id="cars-select"
              value={tempFilters.driverType}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Pilih Tipe Driver
              </option>
              <option value="With Driver">Dengan Sopir</option>
              <option value="Self Drive">Tanpa Sopir (Lepas Kunci)</option>
            </select>
          </div>
          <div className="d-grid col">
            <label htmlFor="date">Tanggal</label>
            <input
              className="form-control rounded-1 mt-1 border"
              type="date"
              id="date"
              name="date"
              value={tempFilters.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-grid col">
            <label htmlFor="time">Waktu Jemput/Ambil</label>
            <input
              className="form-control rounded-1 mt-1 border"
              type="time"
              id="time"
              name="time"
              value={tempFilters.time}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <div>Jumlah Penumpang (optional)</div>
            <div className="input-icon rounded-1 mt-1 border d-flex align-items-center">
              <input
                className="form-control border-0"
                id="passengerCount"
                type="number"
                placeholder="Jumlah Penumpang"
                name="passengerCount"
                value={tempFilters.passengerCount}
                onChange={handleInputChange}
              />
              <span className="input-icon-addon">
                <svg
                  className="me-2"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.167 17.5V15.8333C19.1664 15.0948 18.9206 14.3773 18.4681 13.7936C18.0156 13.2099 17.3821 12.793 16.667 12.6083"
                    stroke="#8A8A8A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.1663 17.5V15.8333C14.1663 14.9493 13.8152 14.1014 13.19 13.4763C12.5649 12.8512 11.7171 12.5 10.833 12.5H4.16634C3.28229 12.5 2.43444 12.8512 1.80932 13.4763C1.1842 14.1014 0.833008 14.9493 0.833008 15.8333V17.5"
                    stroke="#8A8A8A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.333 2.60834C14.05 2.79192 14.6855 3.20892 15.1394 3.7936C15.5932 4.37827 15.8395 5.09736 15.8395 5.8375C15.8395 6.57765 15.5932 7.29674 15.1394 7.88141C14.6855 8.46609 14.05 8.88309 13.333 9.06667"
                    stroke="#8A8A8A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.50033 9.16667C9.34128 9.16667 10.8337 7.67428 10.8337 5.83333C10.8337 3.99238 9.34128 2.5 7.50033 2.5C5.65938 2.5 4.16699 3.99238 4.16699 5.83333C4.16699 7.67428 5.65938 9.16667 7.50033 9.16667Z"
                    stroke="#8A8A8A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <button
              className="btn rounded-1 btn-success border-0 fw-semibold"
              id="load-btn"
              onClick={handleFilter}
              disabled={isButtonDisabled}
            >
              Cari Mobil
            </button>
          </div>
        </div>
      </div>
    </section>
    );


    if (loading) {
      return (
         <>
         <HeroSection />
          <FilterSection />
         <Container className="d-flex justify-content-center align-items-center mt-5">
            <Spinner animation="border" variant="primary" />
         </Container>
         </>
      );
   }

   if (error) {
      return (
         <>
         <HeroSection />
         <FilterSection />
         {/* <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Alert variant="danger">
               Error: {error.message}
            </Alert>
         </Container> */}
         </>
      );
   }

   return (
      <>
         <HeroSection />
         <FilterSection />
         <div>
            <div className="container d-flex flex-wrap gap-3 mt-4 justify-content-center">
                {cars.map(car => (
                  <div key={car.id} className="card-car rounded-3 shadow-sm p-3 d-grid border">
                     <div>
                        <Image className="car-img rounded-2" src={`http://localhost:5000/public${car.image}`} 
                          onError={(e) => {
                            if (!e.target.dataset.fallback) {
                              e.target.dataset.fallback = 'true';
                              e.target.src = `https://res.cloudinary.com/dny7zete3/image/upload/v1719396508/${car.image}.webp`;
                            }
                          }}/>
                        <p className="mb-2 mt-4 fw-semibold">{car.manufacture} - {car.model}</p>
                        <div className="mb-2"><b>Rp {car.rentPerDay} / hari</b></div>
                        <p className="description mb-2">{car.description}</p>
                     </div>
                     <div className="align-self-end">
                        <p className="mb-2 align-items-center d-flex">
                           <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.167 17.5V15.8333C19.1664 15.0948 18.9206 14.3773 18.4681 13.7936C18.0156 13.2099 17.3821 12.793 16.667 12.6083" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M14.1663 17.5V15.8333C14.1663 14.9493 13.8152 14.1014 13.19 13.4763C12.5649 12.8512 11.7171 12.5 10.833 12.5H4.16634C3.28229 12.5 2.43444 12.8512 1.80932 13.4763C1.1842 14.1014 0.833008 14.9493 0.833008 15.8333V17.5" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M13.333 2.60834C14.05 2.79192 14.6855 3.20892 15.1394 3.7936C15.5932 4.37827 15.8395 5.09736 15.8395 5.8375C15.8395 6.57765 15.5932 7.29674 15.1394 7.88141C14.6855 8.46609 14.05 8.88309 13.333 9.06667" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M7.50033 9.16667C9.34128 9.16667 10.8337 7.67428 10.8337 5.83333C10.8337 3.99238 9.34128 2.5 7.50033 2.5C5.65938 2.5 4.16699 3.99238 4.16699 5.83333C4.16699 7.67428 5.65938 9.16667 7.50033 9.16667Z" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                           </svg>{car.capacity}
                        </p>
                        <p className="mb-2 align-items-center d-flex">
                           <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_22128_12390)">
                              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M16.1663 12.5C16.0554 12.7513 16.0223 13.0301 16.0713 13.3005C16.1204 13.5708 16.2492 13.8202 16.4413 14.0166L16.4913 14.0666C16.6463 14.2214 16.7692 14.4052 16.8531 14.6076C16.937 14.8099 16.9802 15.0268 16.9802 15.2458C16.9802 15.4648 16.937 15.6817 16.8531 15.884C16.7692 16.0864 16.6463 16.2702 16.4913 16.425C16.3366 16.5799 16.1527 16.7029 15.9504 16.7867C15.7481 16.8706 15.5312 16.9138 15.3122 16.9138C15.0931 16.9138 14.8763 16.8706 14.6739 16.7867C14.4716 16.7029 14.2878 16.5799 14.133 16.425L14.083 16.375C13.8866 16.1829 13.6372 16.054 13.3668 16.005C13.0965 15.956 12.8177 15.989 12.5663 16.1C12.3199 16.2056 12.1097 16.381 11.9616 16.6046C11.8135 16.8282 11.7341 17.0902 11.733 17.3583V17.5C11.733 17.942 11.5574 18.3659 11.2449 18.6785C10.9323 18.991 10.5084 19.1666 10.0663 19.1666C9.62431 19.1666 9.20039 18.991 8.88783 18.6785C8.57527 18.3659 8.39967 17.942 8.39967 17.5V17.425C8.39322 17.1491 8.30394 16.8816 8.14343 16.6572C7.98293 16.4328 7.75862 16.2619 7.49967 16.1666C7.24833 16.0557 6.96951 16.0226 6.69918 16.0716C6.42885 16.1207 6.17941 16.2495 5.98301 16.4416L5.93301 16.4916C5.77822 16.6466 5.5944 16.7695 5.39207 16.8534C5.18974 16.9373 4.97287 16.9805 4.75384 16.9805C4.53481 16.9805 4.31794 16.9373 4.11561 16.8534C3.91328 16.7695 3.72946 16.6466 3.57467 16.4916C3.41971 16.3369 3.29678 16.153 3.21291 15.9507C3.12903 15.7484 3.08586 15.5315 3.08586 15.3125C3.08586 15.0935 3.12903 14.8766 3.21291 14.6742C3.29678 14.4719 3.41971 14.2881 3.57467 14.1333L3.62467 14.0833C3.81679 13.8869 3.94566 13.6375 3.99468 13.3671C4.04369 13.0968 4.0106 12.818 3.89967 12.5666C3.79404 12.3202 3.61864 12.11 3.39506 11.9619C3.17149 11.8138 2.9095 11.7344 2.64134 11.7333H2.49967C2.05765 11.7333 1.63372 11.5577 1.32116 11.2452C1.0086 10.9326 0.833008 10.5087 0.833008 10.0666C0.833008 9.62462 1.0086 9.2007 1.32116 8.88813C1.63372 8.57557 2.05765 8.39998 2.49967 8.39998H2.57467C2.8505 8.39353 3.11801 8.30424 3.34242 8.14374C3.56684 7.98323 3.73777 7.75893 3.83301 7.49998C3.94394 7.24863 3.97703 6.96982 3.92801 6.69949C3.879 6.42916 3.75012 6.17971 3.55801 5.98331L3.50801 5.93331C3.35305 5.77852 3.23012 5.59471 3.14624 5.39238C3.06237 5.19005 3.0192 4.97317 3.0192 4.75415C3.0192 4.53512 3.06237 4.31824 3.14624 4.11591C3.23012 3.91358 3.35305 3.72977 3.50801 3.57498C3.6628 3.42002 3.84661 3.29709 4.04894 3.21321C4.25127 3.12934 4.46815 3.08617 4.68717 3.08617C4.9062 3.08617 5.12308 3.12934 5.32541 3.21321C5.52774 3.29709 5.71155 3.42002 5.86634 3.57498L5.91634 3.62498C6.11274 3.81709 6.36219 3.94597 6.63252 3.99498C6.90285 4.044 7.18166 4.01091 7.43301 3.89998H7.49967C7.74615 3.79434 7.95635 3.61894 8.10442 3.39537C8.25248 3.17179 8.33194 2.9098 8.33301 2.64165V2.49998C8.33301 2.05795 8.5086 1.63403 8.82116 1.32147C9.13372 1.00891 9.55765 0.833313 9.99967 0.833313C10.4417 0.833313 10.8656 1.00891 11.1782 1.32147C11.4907 1.63403 11.6663 2.05795 11.6663 2.49998V2.57498C11.6674 2.84313 11.7469 3.10513 11.8949 3.3287C12.043 3.55228 12.2532 3.72768 12.4997 3.83331C12.751 3.94424 13.0298 3.97733 13.3002 3.92832C13.5705 3.8793 13.8199 3.75043 14.0163 3.55831L14.0663 3.50831C14.2211 3.35335 14.4049 3.23042 14.6073 3.14655C14.8096 3.06267 15.0265 3.0195 15.2455 3.0195C15.4645 3.0195 15.6814 3.06267 15.8837 3.14655C16.0861 3.23042 16.2699 3.35335 16.4247 3.50831C16.5796 3.6631 16.7026 3.84692 16.7864 4.04925C16.8703 4.25158 16.9135 4.46845 16.9135 4.68748C16.9135 4.90651 16.8703 5.12338 16.7864 5.32571C16.7026 5.52804 16.5796 5.71186 16.4247 5.86665L16.3747 5.91665C16.1826 6.11305 16.0537 6.36249 16.0047 6.63282C15.9557 6.90315 15.9887 7.18197 16.0997 7.43331V7.49998C16.2053 7.74645 16.3807 7.95666 16.6043 8.10472C16.8279 8.25279 17.0899 8.33224 17.358 8.33331H17.4997C17.9417 8.33331 18.3656 8.50891 18.6782 8.82147C18.9907 9.13403 19.1663 9.55795 19.1663 9.99998C19.1663 10.442 18.9907 10.8659 18.6782 11.1785C18.3656 11.4911 17.9417 11.6666 17.4997 11.6666H17.4247C17.1565 11.6677 16.8945 11.7472 16.671 11.8952C16.4474 12.0433 16.272 12.2535 16.1663 12.5V12.5Z" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                              </g>
                              <defs>
                              <clipPath id="clip0_22128_12390">
                              <rect width="20" height="20" fill="white"/>
                              </clipPath>
                              </defs>
                           </svg>
                           {car.transmission}
                        </p>
                        <p className="mb-2 align-items-center d-flex">
                           <svg className="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.8333 3.33331H4.16667C3.24619 3.33331 2.5 4.07951 2.5 4.99998V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V4.99998C17.5 4.07951 16.7538 3.33331 15.8333 3.33331Z" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M2.5 8.33331H17.5" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M13.333 1.66669V5.00002" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M6.66699 1.66669V5.00002" stroke="#8A8A8A" stroke-linecap="round" stroke-linejoin="round"/>
                           </svg>
                           {car.year}
                        </p>
                        <button disabled={!car.available} className="mt-4 align-self-end col-12 btn rounded-1 btn-success border-0 fw-semibold">{car.available ? 'Pilih Mobil' : 'Sudah Dibooking'}</button>
                     </div>
                  </div>
                ))}
            </div>
        </div>
      </>
   )
}
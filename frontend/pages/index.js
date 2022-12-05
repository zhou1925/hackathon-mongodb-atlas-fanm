import {useState, useEffect} from  "react"
import axios from 'axios';
import  *  as  Realm  from  "realm-web";
import { countriesOptions } from '../country_codes';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";


const  app = new  Realm.App({ id:  "<YOUR-APP-ID>"});

export default function Home() {
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);
  const [country, setCountry] = useState('AR');
  const [isLoading, setIsLoading] = useState(false);


  function handleChange(event) {
    setCountry(event.target.value)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const res = await axios.get(`/api/trends/${country}`);
    if (res.status === 200) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const  login = async () => {
      const  user = await  app.logIn(Realm.Credentials.anonymous());
      setUser(user);

      const  mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const  collection = mongodb.db("<YOURDB>").collection("<YOUR COLLECTION>");

      for  await (const  change  of  collection.watch()) {
        setEvents(events  => [...events, change]);
      }
    }
    login();
  }, [])

  
  return (
    <div className="bg-slate-100 h-screen justify-center flex flex-col items-center ">
    <div  className=" px-auto flex ">
    
    {!!user &&
      <div  className="">
        {/* <span className='text-sm'>Connected as user {user.id}</span> */}
      <div>

    <h2 className='mb-4 text-gray-600 text-center font-black'>Pick a country and hit the button</h2>

    <div className='flex flex-row w-full max-w-xs mb-4'>
    <select
      className="select mr-4 select-bordered"
      value={country}
      onChange={handleChange}
    >
      {Object.entries(countriesOptions).map(([key, value]) => (
        <option key={key} value={value}>
          {key}
        </option>
      ))}
    </select>

    <button onClick={submitHandler} className="btn btn-outline text-black">{isLoading ? 'Sending request' :'Get trends'}</button>
    </div>
    <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      > 
        {events.map((e, i) => (
          <SwiperSlide key={i} className="bg-white flex flex-col">
            <p className="text-black">
            {JSON.parse(JSON.stringify(e.fullDocument)).title}
            </p>
            <span className="text-black">
            {JSON.parse(JSON.stringify(e.fullDocument)).approx_traffic}
            </span>
          </SwiperSlide>
        ))}
      </Swiper> 
      </div>
    </div>
    }
    </div>

    </div>
  )
}


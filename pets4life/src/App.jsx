import './App.css';
import logo from './components/catlanding.jpg';
import React, {useState, useEffect} from 'react';
import ImageSlider from './components/ImageSlider';
import { SliderData } from './components/SliderData';
import Basket from "./components/Basket";
import faker from "faker";
import './components/Basket';
import { Modal } from 'react-responsive-modal';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';

// https://www.npmjs.com/package/react-responsive-modal

function App() {
  const [theData, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    HandleFetch();
  }, []);

  const HandleFetch = async () => {
    let response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
    let data = await response.json();
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        item.name = faker.name.findName();
        item.price = faker.commerce.price();
        item.breed = faker.animal.cat();
        item.desc = faker.commerce.productAdjective();
    }
    setData(data);
  };


  const addToBasket = (item) => {
    setBasket([...basket, item])
  }

  return (
    <div id="background">
    <div className="App">
      <div id="pcheader">
            <div class="pclogo" class="pcheadlinks">
                <a ><img src={logo} alt="Logo" id="logoimg"/></a>
                <a id="homepage"><h2>Cats4Life</h2></a>
            </div>
            <div class="pcheadlinks">
                <a class="navlink" onClick={onOpenModal}>Checkout</a>
                
                <Modal open={open} onClose={onCloseModal} center className="modal">
                        <Basket basket={basket} className="modal"/>
                        
                </Modal>
               
            </div>
      </div>

      <div class="contentspace">

      </div>

      <div id="heading">
        <h1>Cats4Life</h1>
        <p className="para">Your one stop shop for cats & kittens! </p>
      </div>
      <div id="maincontent">
        <ImageSlider slides={SliderData}/>
      </div>
      <div id="salecontent">
        <Items data={theData} addToBasket={addToBasket}/>
      </div>
    </div>
    </div>
  );
  
}


const Items = ({data, addToBasket}) => {
  return (
    <div className="cats">
      {data.map((item) =>(
        <div className="cat">
          <img src={item.url} class="catimages"/>
          <h1>
            {item.breed}
          </h1>
          <p>
            {item.name}
          </p>
          <p>
            £{item.price}
          </p>
          <p>
            {item.desc}
          </p>
          <div class="buttoncontainer">
            <button id='work' type="button" onClick ={() => addToBasket(item)}>Add to basket</button>
          </div>
        </div>
      ))}
    </div>
  )
}


export default App;

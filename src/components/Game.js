import React,{ useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from './Item'

import useInterval from '../hooks/use-interval.hook'
import useKeydown from '../hooks/use-keydown.hook'
import useDocumentTitle from '../hooks/use-setTitle.hook'



const Game = () => {
  // TODO: Replace this with React state!
  const initialPurchasedItems = {
    cursor: 0,
    grandma: 0,
    farm: 0,
    megacursor: 0,
  };

  const initItems = [
    { type:'tick', id: "cursor", name: "Cursor", cost: 10, value: 1 },
    { type:'tick', id: "grandma", name: "Grandma", cost: 100, value: 10 },
    { type:'tick', id: "farm", name: "Farm", cost: 1000, value: 80 },
    { type:'click', id: "megacursor", name: "Mega Cursor", cost: 50, value: 1 },
  ];
  const [items, setItems] = useState(initItems)
  const [numCookies, setNumCookies] = useState(100)
  const [purchasedItems, setpurchasedItems] = useState(initialPurchasedItems)
  const [megaCursor, setMegaCursor] = useState(1)
  useKeydown(32,() =>{setNumCookies(numCookies + 1)})
  const setTabContent = useDocumentTitle('cookieGame')

  const calculateCookiesPerTick = () => {
    return items.reduce((acc, curr) =>{
      if(purchasedItems[curr.id] > 0 && curr.type === 'tick'){
        return acc + (curr.value * purchasedItems[curr.id])
      } else {
        return acc
      }
    }, 0)
    
  }
  useInterval(() =>{
    const numOfGeneratedCookies = calculateCookiesPerTick();
    setNumCookies(numCookies + numOfGeneratedCookies)
    setTabContent(numCookies + numOfGeneratedCookies)
  },1000)

  const augmentValue = (str) =>{
    const randIncArr = [0.25, 0.33, 0.50, 0.75];
    const randInc = randIncArr[Math.floor(Math.random() * randIncArr.length)];
    const item = items.filter(it => it.id === str)[0]
    const itemIndex = items.indexOf(item)
    const newVal = (items[itemIndex].cost * randInc) + items[itemIndex].cost
    items[itemIndex].cost = Math.ceil(newVal)
    setItems([...items])
  }

  const handleClick = (str) =>{
    
    const item = items.filter(it => it.id === str)[0]
    if(numCookies >= item.cost){
      if(item.type === 'tick'){
        setNumCookies(numCookies - item.cost)
        setpurchasedItems({...purchasedItems, [str]: purchasedItems[str] + 1})
      } else{
        setNumCookies(numCookies - item.cost)
        setpurchasedItems({...purchasedItems, [str]: purchasedItems[str] + 1})
        setMegaCursor(megaCursor + item.value)
      }
    } else{
      window.alert('need money pal!')
      return
    } 
    augmentValue(str)
  }

  const itemsList = items.map((data, index) =>
    <li key={data.id}>    
      <Item  
        itemData={data} 
        numOwned={purchasedItems[`${data.id}`]} 
        handleClick={handleClick}
        isFirst={index}
        />
    </li>
  
);

  

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
    <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie src={cookieSrc} onClick={() => setNumCookies(numCookies + megaCursor)}/>
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        
        <ul>{itemsList}</ul>
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;

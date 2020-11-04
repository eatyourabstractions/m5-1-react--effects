import React, {useRef, useEffect} from "react";
import styled from "styled-components";


//const oneitem = { id: "farm", name: "Farm", cost: 1000, value: 80 }
const Item = ({itemData, numOwned, handleClick, isFirst}) =>{
    const ref = useRef(null);
    const msg = itemData.type === 'tick' ? 'second.' : 'click.';

    useEffect(() =>{
        if(isFirst === 0){
            ref.current.focus()
        }
    })
    return(
        <>
        <h1>
            <Atag ref={ref} href='#' onClick={() => handleClick(itemData.id)}>{itemData.name}</Atag>
        </h1>
    <p>{`Cost: ${itemData.cost} cookie(s). Produces ${itemData.value} cookies/${msg} `}<Bold>{numOwned}</Bold></p>
        <hr/>
        </>
    )
}

const Bold = styled.span`
    font-weight: 900;
`;

const Atag = styled.a`
    color: whitesmoke
`
export default Item
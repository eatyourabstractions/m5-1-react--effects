import  {useEffect, useState} from 'react';

export default function useKeydown(targetKey, handleKeyDown) {
    const [userKey, setUserKey] = useState(targetKey)
   
    const downHandler = (ev)  => {
      if (ev.keyCode === userKey) {
        handleKeyDown();
      }
    }
  

    // Add event listeners
    useEffect(() => {
      window.addEventListener('keydown', downHandler);
      
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler);
        
      };
    }); 
  
    return setUserKey;
  }
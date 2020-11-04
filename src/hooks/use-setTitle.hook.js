import {useEffect, useState} from 'react';

export default function useDocumentTitle(defaultTitle){
    const [coockiesInTitle, setCookiesInTitle] = useState(0)

    useEffect(() =>{
        document.title = `${coockiesInTitle} cookies`

        return () =>{
          document.title = defaultTitle
        }
      }, [coockiesInTitle, defaultTitle])

    return setCookiesInTitle
}
import { useEffect, useState, useRef } from 'react';

import Login from '../components/Login';
import ChatterBox from '../components/ChatterBox';

export default function Home() {

  const [isUsernameConfirmed, setUsernameConfirmed] = useState(false);



  const [username, setUsername] = useState("");

  if(!isUsernameConfirmed) {
    return(
      <Login 
        username={username} 
        setUsername={setUsername} 
        isUsernameConfirmed={isUsernameConfirmed}
        setUsernameConfirmed={setUsernameConfirmed}
      />
    );
  }



  else {
    return(
      <>
        <ChatterBox username={username}/>
      </>
    );
  }
}


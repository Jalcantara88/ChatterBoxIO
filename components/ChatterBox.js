import Head from 'next/head';
import { useEffect, useState, useRef, } from 'react';
import { io } from 'socket.io-client';
import {
  Button
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {EMOJIS} from '../public/emojis';
import EmojiButtons from '../components/EmojiButtons';

export default function ChatterBox(props) {

    //create hook states
  
  //socket: holds socket value - instantiate to null value
  const [socket, setSocket] = useState(null);


  //username: holds the username as a string - instantiate as empty string
   const username = props.username; 

   const [roomSelected, setRoomSelected] = useState(false);

   const [roomName, setRoomName] = useState("");


  //message: holds current message being dealt with - instantiate to empty string
  const [message, setMessage] = useState("");

  //history: holds all objects submitted and echoed back from server - instantiate to empty array
  const [history, setHistory] = useState([
    //example object of what an object will hold
    /*
    {
      username: "John Doe",
      message: "message"
    }
    */
  ]);

  const [allUsers, setAllUsers] = useState([]); 

  //arrow function that handles a new socket connect
  const connectSocket = () => {
    
    if(!socket) {
      //create new socket using socket.io
      const newSocket = io("https://chatter-box-io.herokuapp.com/");
      
      //socket.io action types

      //confirm connection
      newSocket.on("connect", () => {
        //const sessionID = newSocket.socket.sessionid;

        //newSocket.emit("get-all-rooms");
        newSocket.emit("user-joined", username);

        //console.log(newSocket);
        //setSocketId(newSocket.id);
        console.log("Chatter Box Connected");
      });

      newSocket.on("all-users-update", (usersArray) => {
        console.log("incoming usersArray: " + usersArray);
        let newUsersArray = usersArray;
        setAllUsers(newUsersArray);
      });

      //handles message submit taking the message object as an argument in the second parameter
      newSocket.on("message", (msg) => {
        //calls hook to spread current history array and append new message object
        setHistory((history) => [...history, msg]);

        //console.log(newSocket);
      });

      //handles server disconnect by logging it to console
      newSocket.on("disconnect", () => {
          newSocket.emit("user-left", username);
        console.warn("WARNING: chat app disconnected");
      });

      //set your socket to this setup
      setSocket(() => newSocket);
    }
  };
  

  //function that scrolls down to bottom of scrollview
  const goToMessageBottom = () => {
    if(document.getElementById("messageList")) {
      document.getElementById("messageList").scrollTo({
        top: document.getElementById("messageList").scrollHeight,
        
        behavior: 'smooth'});
    }
    else {
      return
    }
  }

  const renderedUsers = allUsers.map(user => {
      return(
        <div key={user.toString()} className="col-4 rounded bg-dark text-white">
            {user}
        </div>
      );
  });


  

  //on mount connect your socket
  useEffect(() => {
    connectSocket();
    //console.log("you are connected to socket: " + socket);
    //socket.emit("user-joined", username);
  }, []);
  

  //on update of history array, call scroll to bottom function
  useEffect(() => {
    
    goToMessageBottom();
  }, [history]);

  //handle submit of message to be handled by action type taking the form event as an arguement
  const handleSubmit = (e) => {

    //prevent the page from reloading on submit
    e.preventDefault();
    
    //check to see if you have a socket to use to submit to server, if not alert and return
    if(!socket) {
      alert("Chatter Box not connected yet. Please try again.");
      return;
    }

    //prevent submitting empty object
    if(!message) {
      console.log("empty");
      return;
    }

    //submit message object passing in message and username as object
    socket.emit("message-submitted", { message, username });

    //empty message value for next value
    setMessage("");
  };

  /*
  const handleRoomSubmit = (e) => {
    setRoomSelected(true);
  }
  */


  //handle onchange for form submit - sets current message string to value of input box
  const handleChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
    console.log(history);
  };

  const handleRoomChange = (e) => {
      setRoomName(e.target.value);
  };

  //iterate through history array and display messages - destructure username and message elements
  const chatterBox = history.map(({ username, message }, i) => 
    (
      <div key={i} className="mb-3">
        <strong className=" pl-2 pr-1 py-1" style={{backgroundColor: "#a3d2ca", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", color: "#5eaaa8"}}>{username}:</strong>
        <span className=" text-white pr-2 pl-1 py-1" style={{backgroundColor: " #5eaaa8", borderTopRightRadius: "10px", borderBottomRightRadius: "10px",}}> {message} </span>
      </div>
    )
  );

 
        if(!roomSelected) {
            return(
                <>
                    <Head>
                        {/*title and favicon */}
                        <title>ChatterBox.io</title>
                        <link rel="icon" href="/favicon.ico" />
                        <meta charSet="UTF-8"></meta>
                    </Head>
                    <div className="container-fluid">
                        <div className="row justify-content-center text-white" style={{ backgroundColor: "#ff8474"}}>
                                <p className="m-0"> Chatting as <strong>{username}</strong> </p>
                        </div>
                        <div className="row justify-content-center my-5">
                            <form 
                            //onSubmit={handleRoomSubmit} 
                            className=" mx-auto">
                                
                                <label htmlFor="message">
                                    <input  
                                    type="text"
                                    id="roomName"
                                    name="roomName"
                                    value={roomName}
                                    //fires value change
                                    onChange={handleRoomChange}
                                    placeholder="room name here"
                                    //disables input until username is set
                                    //disabled={!isUsernameConfirmed}
                                    className="align-middle"
                                    style={{border: 0}}
                                    />
                                </label>
                                <Button
                                    onClick={() => {
                                        setRoomSelected(true);
                                    }}
                                    className="ml-3 p-1"
                                >
                                    create room
                                </Button>
                            </form>
                        </div>
                        <div className="row justify-content-center">
                            <h3>Select a Room or Create a new One</h3>
                        </div>
                        <div className="row justify-content-center">
                            # of users connected: {allUsers.length}
                        </div>
                    </div>

                    <footer className="mt-5 text-center text-white" style={{bottom: "10%"}}>ChatterBox.io</footer>

                </>
            );
        }

        else{

            return(
                <>
                  <Head>
                    {/*title and favicon */}
                    <title>ChatterBox.io</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta charSet="UTF-8"></meta>
                  </Head>
                  <div className="container-fluid">
                      <div className="row justify-content-center text-white" style={{ backgroundColor: "#ff8474"}}>
                            <p className="m-0"> Chatting as <strong>{username}</strong> </p>
                      </div>
                  </div>
                  {/*display history*/}
                  <div className="container" style={{marginTop: "15%" }}>
                    <div className="row justify-content-center">
                      
                      <div className="col-10 col-md-8 col-lg-6 col-xl-4 rounded pb-2 px-0 pt-4" style={{backgroundColor: "#ffc996"}}>
                        <div className="row justify-content-center">
                            <div className="col-4">
                                <h3>
                                    {roomName}
                                </h3>
                                
                            </div>
                            <div className="col-4">
                                <Button onClick={() => {
                                     setRoomSelected(false);
                                }}>
                                    Leave
                                </Button>
                            </div>
                        </div>
                        <div className="row-fluid">
                          <div className="col bg-white border pt-3" id="messageList" style={{height: "200px", overflowY: "scroll"}}>
                            {chatterBox}
                            <div  id="messageBottom"></div>
                          </div>
                        </div>
                        
                        <div className="row pt-3">
                        <form onSubmit={handleSubmit} onChange={() => {
                          
                        }} className=" mx-auto">
                            
                              <label htmlFor="message">
                                
                                <input  
                                  type="text"
                                  id="message"
                                  name="message"
                                  value={message}
                                  //fires value change
                                  onChange={handleChange}
                                  placeholder={
                                    //ternary operator to check if username is set yet, if not it asks user to do so
                                    " Chat Here..."
                                  }
                                  //disables input until username is set
                                  //disabled={!isUsernameConfirmed}
                                  className="align-middle"
                                  style={{border: 0}}
                                />
                              </label>
          
                              <Button 
                                type="submit"  
                                //disabled={!isUsernameConfirmed}
                                className="px-3 "
                                style={{padding: "1px",  backgroundColor: "#ff8474", border: 0, borderRadius: 0}}
                              >
                                Send
                              </Button>
                              
                          </form>
          
                        </div>
          
                        <div className="col-12 mx-auto">
                          <EmojiButtons emojiArray={EMOJIS} setMessage={setMessage} message={message}/>
                        </div>
          
                      </div>
          
                    </div>
                    
                  </div>
          
                  <footer className="text-center text-white" style={{bottom: "10%"}}>ChatterBox.io</footer>
          
                  <div className="row justify-content-center">
                      Users in Room:
                      <div className="col-10 col-lg-6">
                            <div className="row justify-content-center">
                                {renderedUsers}
                            </div>
                          
                      </div>    
                  </div>
                </>
              );

        }

}
export default function Login(props) {
    return(
        //html display for Chatter Box app
        <div>
          
          <Head>
            {/*title and favicon */}
            <title>ChatterBox.io</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8"></meta>
          </Head>
  
          {/*username component passing in props */}
          <div style={{marginTop: "20%", backgroundColor: "#ff8474"}} className="pt-2">
            <UsernameField
              completed={props.isUsernameConfirmed}
              value={props.username}
              roomName={roomName}
              onChange={(value) => {props.setUsername(value); console.log(username);}}
              //onRoomChange={(value) => {setRoomName(value); console.log(roomName);}}
              onSubmit={() => 
                {
                  if(username === "") {
                    alert("please set a username to chat");
                }
                else {
                    props.setUsername(props.username);
                  props.setUsernameConfirmed(true);
                  //socket.emit("user-joined", username);
                }
              }}
            />
          </div>    
        
          <footer className="text-center text-white" style={{bottom: "10%", backgroundColor: "#ff8474"}}>ChatterBox.io</footer>
  
          <div className=" col-12 col-md-10 col-lg-6 rounded bg-white px-5 py-3 mx-auto mt-5">
            <h3 className="text-center text-dark">Welcome to Chatter Box IO</h3>
            <p className="text-center text-dark">
              Set your username and connect to Create or Join available Rooms
              <br/>
              Chat with other users, share ideas, or just observe.
              <br/>
              <br/>
              All are welcome!
            </p>
          </div>
          
          <div className=" col-12 col-md-10 col-lg-6 rounded bg-white px-5 py-3 mx-auto mt-5">
            <h3 className="text-center text-dark">About This Project</h3>
            <p className="m-0">
              This was a project built for a Mintbean Hackathon: Create A Chat App
              <br/>
              <br/>
              <strong>Challenge</strong>
              <br/>
              Make a Chat Room app using React Next, Express and Socket.IO. Deploy to live site.
              <br/>
              <br/>
              <strong>My Hurdles</strong>
              <br/>
              I have never worked with Socket.IO, Express, or set up a server to handle api requests. So for me, this was a very difficult challenge.
              I came accross issues mostly in getting my server hosted on heroku to accept incoming connections. Everything worked locally but not in deployment.
              Figuring out how to make my own custom emoji buttons and figuring out how to constantly scroll the chat window down everytime a new message is sent was
              also a little tricky to understand.
              <br/>
              <br/>
            </p>
  
          </div>
  
        </div>
      );
}
import UsernameField from '../components/UsernameField';
import Head from 'next/head';


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

          <div className=" col-12 col-md-10 col-lg-6 mx-auto mt-3">
            <h3 className="text-center rounded-top text-white m-0 py-2" style={{backgroundColor: "#5eaaa8"}}>Welcome to Chatter Box IO</h3>
            <p className="text-center text-dark bg-white p-3 rounded-bottom">
              Set your username and Connect to Create or Join available Rooms
              <br/>
              Chat with other users, share ideas, or just observe.
              <br/>
              <strong style={{color: "#ff8474"}}>Features</strong>
              <br/>
              <div className="row justify-content-center">
                <div className=" rounded text-white p-1" style={{backgroundColor: "#ff8474"}}>
                    Usernames
                </div>
                <div className="mx-2 rounded text-white p-1" style={{backgroundColor: "#ff8474"}}>
                    Rooms
                </div>
                <div className="rounded text-white p-1" style={{backgroundColor: "#ff8474"}}>
                    Emojis
                </div>
              </div>
              
              
              All are welcome!
            </p>
          </div>
  
          {/*username component passing in props */}
          <div style={{backgroundColor: "#ff8474"}} className="pt-2 mt-5">
            <UsernameField
              completed={props.isUsernameConfirmed}
              value={props.username}
              
              onChange={(value) => {props.setUsername(value); console.log(props.username);}}
              
              onSubmit={() => 
                {
                  if(props.username === "") {
                    alert("please set a username to chat");
                }
                else {
                    props.setUsername(props.username);
                  props.setUsernameConfirmed(true);
                  
                }
              }}
            />
          </div>    
        
          <footer className="text-center text-white" style={{bottom: "10%", backgroundColor: "#ff8474"}}>ChatterBox.io</footer>
  
         
          
          <div className=" col-12 col-md-10 col-lg-6 mx-auto mt-5">
            <h3 className="text-center rounded-top text-white m-0 py-2" style={{backgroundColor: "#5eaaa8"}}>About This Project</h3>
            <p className="m-0 text-center bg-white text-dark p-3 rounded-bottom">
              This was a project built for a Mintbean Hackathon: Create A Chat App by me:
              <br/>
              <strong style={{color: "#5eaaa8"}}>JULIO ALCANTARA</strong>
              <br/>
              <br/>
              <strong style={{color: "#ff8474"}}>The Challenge</strong>
              <br/>
              Make a Chat Room app using React Next, Express and Socket.IO. Deploy to live site.
              <br/>
              <br/>
              <strong style={{color: "#ff8474"}}>My Hurdles</strong>
              <br/>
              I have never worked with Socket.IO, Express, or set up a server to handle api requests. So for me, this was a very difficult challenge.
              I came accross issues mostly in getting my server hosted on heroku to accept incoming connections. Everything worked locally but not in deployment.
              <br/>
              Also, Figuring out how to make my own custom emoji buttons and figuring out how to constantly scroll the chat window down everytime a new message is sent was
              also a little tricky to understand.
            </p>
  
          </div>

          <div class="container-fluid pt-1 mt-5" style={{backgroundColor: "#ff8474"}}>
            <p class="text-center m-0 p-3 pb-2 about-font">
              <strong class="text-white">MY PERSONAL LINKS</strong><br/>come check me out at my social accounts and send me some love!
              
            
            </p>
              <div class="row">
                <div class="col-11 col-sm-8 col-md-6 mx-auto p-0">
                  
                  <div class="row justify-content-center pt-0 pb-4 pb-md-5 pb-xl-6">
                    <a class="col" href='https://www.linkedin.com/in/deadheadstudio/'><img class="social-img" src="/social/linkedin.svg"/></a>
                    <a class="col" href='https://github.com/Jalcantara88'><img class="social-img" src="/social/github.svg"/></a>
                    <a class="col" href='https://www.behance.net/DeadHead'><img class="social-img" src="/social/behance.svg" /></a>
                    <a class="col" href='https://www.instagram.com/bone.head.designer/'><img class="social-img" src="/social/instagram.svg"/></a>
                    <a class="col" href='https://www.youtube.com/channel/UCzLJQTYgUrhEFAOxt2ek0lg?'><img class="social-img" src="/social/ytube.svg"/></a>
                  </div>
                </div>
              </div>
            </div>
  
        </div>
      );
}
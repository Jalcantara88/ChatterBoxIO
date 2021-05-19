import {
  Button
} from 'reactstrap'

function EmojiButtons(props) {
    let span = document.createElement('col');
  
    const emojis = props.emojiArray.map(item => {
      return(
        <div key={item.code}>
         
        <Button 
          className="border p-1 mx-1" 
          style={{backgroundColor: 'transparent'}}
          onClick={() => {
            props.setMessage(props.message + item.code);
          }}
        >
          {span.innerHTML = item.code}
          
        </Button>
        </div>
      );
    });
  
    return(
      <div className="row justify-content-center">
      {emojis}
      </div>
    );
  }

export default EmojiButtons;
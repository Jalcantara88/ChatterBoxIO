import {
    Button
  } from 'reactstrap';

const UsernameField = ({ value, onChange, onSubmit}) => {
    
    return(
        <div className="container">
            <div className="row justify-content-center">
                    
                <form
                    onSubmit={
                        (e) => e.preventDefault() || onSubmit(value)
                    }
                >
                    <label 
                        htmlFor="username"
                    >
                        
                        <input  
                            type="text"
                            name="username"
                            value={value}
                            onChange={
                                (e) => e.preventDefault() || onChange(e.target.value)
                            }
                            placeholder={
                                " create username"
                            }
                            style={{border: 0}}
                            className="align-middle"
                            required
                        />
                    </label>
                   
                    <Button 
                        type="submit"
                        className=" my-auto px-2"
                        style={{ border: 0, borderRadius: 0, padding: "1px", backgroundColor: "#5eaaa8"}}
                    >
                        begin
                    </Button>
                </form> 
            </div>
        </div>  
    );
};

export default UsernameField;
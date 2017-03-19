import Emoji from "./Emoji"

const Message = (msg) => { 
	

	return (
		<div className="message" >
		{msg}
			<Emoji/>
			
		</div>
	)

}

export default Message
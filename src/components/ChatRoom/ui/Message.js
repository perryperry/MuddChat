import Emoji from "./Emoji"

const Message = (msg) => { 
	

	return (
		<div className="message" >
			<Emoji/>
			{msg}
		</div>
	)

}

export default Message
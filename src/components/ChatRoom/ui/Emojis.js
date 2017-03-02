import Emoji from '../ui/Emoji'

const Emojis = ({emojis=[]}) => {
	return (
		<div className="emojisWrap">
			{emojis.map((emoji, i) =>
	                
	             <Emoji key={i} emoji={emoji} />
	               
	        	)
	        }
		</div>
	)
}

export default Emojis
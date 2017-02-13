import { PropTypes } from 'react'
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import '../../stylesheets/Landing.scss'


const sourceArray = [ 
  {
    src: 'OpeningCeremony.mp4',
    type: 'video/mp4'
  }
]

const Landing = () => 
{
	return (
		<div className="videoWrap">
			 <Video controls width="50%">
	            <source src="/OpeningCeremony.mp4" type="video/mp4" />
	            <Overlay  />
        		<Controls>
	                <Play />
	                <Seek />
	                <Time />
	                <Mute />
	                <Fullscreen />
	            </Controls>
   			 </Video>
		</div>
	)
}
export default Landing
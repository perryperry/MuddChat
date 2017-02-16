import { PropTypes } from 'react'
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import '../../stylesheets/Landing.scss'

const Landing = () => 
{
	return (
		<div className="landingWrap">
			<div className="videoWrap">
				 <Video  
				 	controls 
				 	loop 
				 	width="100%" 
				 	poster="https://2.bp.blogspot.com/-4aZ_wP28JUk/WC3gb8cxoRI/AAAAAAAAEg4/8F1O46ALX7wnoXUUeaooSFavg5x-fbnhACLcB/s1600/tumblr_o3youeYPqF1rtbl5vo1_500%255B1%255D.gif">
		            <source src="/OpeningCeremony.mp4" type="video/mp4" />
		            <source src="/EddyCake.mp4" type="video/mp4" />
		            <Overlay  />
	        		<Controls>
		                <Play className="controls"/>
		                <Seek className="controls"/>
		                <Time className="controls"/>
		                <Mute className="controls"/>
		                <Fullscreen className="controls"/>
		            </Controls>
	   			 </Video>
			</div>
		</div>
	)
}
export default Landing
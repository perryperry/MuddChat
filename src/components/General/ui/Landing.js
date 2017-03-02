import { PropTypes } from 'react'
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import '../../../stylesheets/Landing.scss'
import '../../../stylesheets/ReactHtml5Video.scss'

const Landing = () => 
{
	return (
		<div className="landingWrap">
			<div className="titleWrap">
				<h2 className="center title">Year of the <span id="donald">Donald</span></h2>
			</div>
			<div className="videoWrap">
				 <Video  
				 	controls 
				 	loop 
				 	width="100%" 
				 	poster="https://2.bp.blogspot.com/-4aZ_wP28JUk/WC3gb8cxoRI/AAAAAAAAEg4/8F1O46ALX7wnoXUUeaooSFavg5x-fbnhACLcB/s1600/tumblr_o3youeYPqF1rtbl5vo1_500%255B1%255D.gif">
		            <source src="/OpeningCeremony.mp4" type="video/mp4" />
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
			<div className="videoWrap">
				 <Video  
				 	controls 
				 	width="100%" 
				 	poster="http://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/psycho_primary.jpg">
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
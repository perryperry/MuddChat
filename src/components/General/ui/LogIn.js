import { PropTypes } from 'react'
import { LocalForm, Control } from 'react-redux-form';
import Landing from './Landing'
import '../../../stylesheets/LogIn.scss'


const sourceArray = [ 
  {
    src: 'OpeningCeremony.mp4',
    type: 'video/mp4'
  }
]

const LogIn = ({ loggedIn=false, logIn}) => 
{
	const handleChange = (values) => {console.log(values) }
  	const handleUpdate =(form) => {}
  	const handleSubmit =(values) => { 
  		console.log(values.username)
  		logIn(values.username)
  	}
	let name = ''
	

	if(! loggedIn) {
	   return (
	   	<div className="login-wrapper" >
	   	<select className="center">
	   		<option value="">Select your team</option>
	   		<option value="1">Yan</option>
	   	</select>
	   	<div className="logInForm">
		   	<LocalForm 
		        onUpdate={(form) => handleUpdate(form)}
		        onChange={(values) => handleChange(values)}
		        onSubmit={(values) => handleSubmit(values)}
		      >
		        <Control.text model=".username" className="center logInInput" placeholder="Enter your last name"/>
		         <button className="center">Submit</button>
		      </LocalForm>
	      </div>
	    </div>
	    )
	} else {
		return (
			<Landing />
		)
	}
}

LogIn.propTypes = {
    loggedIn: PropTypes.bool,
    logIn: PropTypes.func
};
export default LogIn
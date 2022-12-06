import React, { useEffect, useState } from 'react'
import './App.scss';
import Iframe from 'react-iframe'
import axios from 'axios'

const api = process.env.REACT_APP_API
const timeOut = process.env.REACT_APP_TIMEOUT

function App() {

	const [iframe, setIframe] = useState({})
	const [iframes, setIframes] = useState([])
	const [currentCount, setCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false)

	const getData = async () => {
		return await axios.get(`${api}/iframes`)
			.then((response) => response.data)
			.then((data) => {
				setIframes(data);
				setIsLoading(false)
			}).catch((e) => alert(e))
	}

	useEffect(() => {
		getData()
	}, [])


	useEffect(() => {

		if (currentCount === iframes.length) setCount(0);

		const id = setInterval(() => {
			setCount(currentCount + 1)
			setIframe(iframes[currentCount])
		}, timeOut);

		return () => clearInterval(id);
	}, [currentCount, iframes]);

	return isLoading ? <div>Loading...</div> : <Iframe
		url={iframe.src}
		title={iframe.title}
		position="absolute"
		width="100%"
		height="100%"
		display="block"
	/>
}

export default App
import { Html, useProgress } from '@react-three/drei'

function Loader() {
	const { progress } = useProgress()
	console.log(progress);
	return <Html center>{progress} % loaded</Html>
}

export default Loader;
import { BrowserRouter } from "react-router";
import "./App.css";
import { Layout } from "./components/layout/Layout";

function App() {
	return (
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	);
}

export default App;

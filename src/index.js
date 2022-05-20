import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
			>
				<Router>
					<App />
				</Router>
			</SnackbarProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
module.hot.accept();

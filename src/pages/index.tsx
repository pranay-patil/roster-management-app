import { ProviderCalendar } from "@/components/ProviderCalendar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Home() {
	return (
		<Provider store={store}>
			<ProviderCalendar />;
		</Provider>
	);
}

import { Toaster } from "react-hot-toast";
import AddPersonModal from "./components/AddPersonModal";
import People from "./components/People";
import "./globals.css";
import ExportModal from "./components/ExportModal";
import PriceChangerModal from "./components/PriceChangerModal";

function App() {
    return (
        <main className="p-2 sm:p-4 md:p-8 prose">
            <Toaster toastOptions={{ duration: 5000 }} />

            <People />

            <AddPersonModal />
            <ExportModal />
            <PriceChangerModal />
        </main>
    );
}

export default App;

import { MdClose } from "react-icons/md";
import { usePeople } from "../hooks/usePeople";
import toast from "react-hot-toast";

const ExportModal = () => {
    const { people } = usePeople();
    const dataString = JSON.stringify(people, null, 2);
    const copyData = () => {
        navigator.clipboard
            .writeText(dataString)
            .then(() => toast.success("Copied!"))
            .catch((err) => {
                toast.error("Error copying data! Check console for more info.");
                console.log(err);
            });
    };

    return (
        <dialog className="modal max-sm:modal-bottom" id="export_modal">
            <div className="modal-box max-w-lg">
                <button
                    type="button"
                    onClick={() => window.export_modal.close()}
                >
                    <MdClose
                        size={32}
                        className="absolute right-6 top-6 hover:text-primary z-10"
                    />
                </button>
                <h2 className="m-0 pb-4">
                    Export as JSON{" "}
                    <span className="text-lg">({people.length} people)</span>
                </h2>
                <pre className="max-h-64">{dataString}</pre>
                <button onClick={copyData} className="btn btn-success w-full">
                    Copy
                </button>
            </div>
        </dialog>
    );
};

export default ExportModal;

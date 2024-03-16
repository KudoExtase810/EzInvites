import { useState } from "react";
import { MdClose } from "react-icons/md";
import { genId } from "../utils";
import { usePeople } from "../hooks/usePeople";
import toast from "react-hot-toast";

const AddPersonModal = () => {
    const [fullName, setFullName] = useState<string>("");
    const [type, setType] = useState<Person["type"] | null>(null);

    const { people, setPeople } = usePeople();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!type || !fullName) {
            return toast.error("All fields are required!");
        }

        const newPerson: Person = {
            id: genId(),
            fullName,
            type,
        };
        setPeople([...people, newPerson]);
        setFullName("");
        toast.success(`${fullName} has been added to the list.`);
    }

    return (
        <dialog className="modal max-sm:modal-bottom" id="add_person_modal">
            <div className="modal-box max-w-lg">
                <button
                    type="button"
                    onClick={() => window.add_person_modal.close()}
                >
                    <MdClose
                        size={32}
                        className="absolute right-6 top-6 hover:text-primary z-10"
                    />
                </button>
                <h2 className="px-4 m-0">Add someone to the list</h2>
                {/* content */}
                <form className="p-4" noValidate onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2.5">
                        <div>
                            <label className="label-text" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="input input-bordered w-full"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Mohammed Ali"
                            />
                        </div>
                        <div>
                            <label className="label-text" htmlFor="name">
                                Type
                            </label>
                            <select
                                onChange={(e) =>
                                    setType(e.target.value as Person["type"])
                                }
                                className="select select-bordered w-full"
                            >
                                <option disabled selected>
                                    Select a type
                                </option>
                                <option value="relative">Relative</option>
                                <option value="friend">Friend</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control mt-8">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default AddPersonModal;

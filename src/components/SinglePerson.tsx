import { MdClose } from "react-icons/md";
import { formatNumber } from "../utils";
import { usePeople } from "../hooks/usePeople";
import toast from "react-hot-toast";

interface SinglePersonProps {
    person: Person;
    idx: number;
}

const SinglePerson = ({ person, idx }: SinglePersonProps) => {
    const { people, setPeople } = usePeople();

    const handleDelete = () => {
        const filtered = people.filter((p) => p.id !== person.id);
        setPeople(filtered);
        toast.success(`${person.fullName} has been removed from the list.`);
    };

    return (
        <tr>
            <th>{formatNumber(idx + 1)}</th>
            <td>{person.fullName}</td>
            <td>
                <div
                    className={`capitalize badge ${
                        people.length > 10 && "badge-sm"
                    } ${
                        person.type === "relative"
                            ? "badge-success text-success-content"
                            : "badge-warning text-warning-content"
                    }`}
                >
                    {person.type}
                </div>
            </td>
            <td>
                <button type="button" onClick={handleDelete}>
                    <MdClose className="text-2xl z-10 link-error" />
                </button>
            </td>
        </tr>
    );
};

export default SinglePerson;

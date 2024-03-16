import { FaSearch } from "react-icons/fa";
import { usePeople } from "../hooks/usePeople";

interface FiltersProps {
    filters: {
        fullName: string;
        type: string;
        showSimilarOnly: boolean;
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            fullName: string;
            type: string;
            showSimilarOnly: boolean;
        }>
    >;
}

const Filters = ({ filters, setFilters }: FiltersProps) => {
    const { people } = usePeople();
    return (
        <div className="pb-2 pt-6 flex flex-col gap-2">
            <div className="relative">
                <input
                    onChange={(e) =>
                        setFilters({ ...filters, fullName: e.target.value })
                    }
                    value={filters.fullName}
                    type="text"
                    placeholder="Search by name..."
                    className="input input-bordered w-full"
                    disabled={!people.length}
                />
                <FaSearch className="text-xl absolute top-3.5 right-4" />
            </div>
            <select
                onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                }
                className="select select-bordered w-full"
                disabled={!people.length}
            >
                <option disabled selected>
                    Filter by type
                </option>
                <option value="relative">Relatives</option>
                <option value="friend">Friends</option>
                <option value="">All</option>
            </select>
            <label className="label cursor-pointer">
                <span className="label-text">
                    Show people with similar names only
                </span>
                <input
                    disabled={!people.length}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            showSimilarOnly: e.target.checked,
                        })
                    }
                    type="checkbox"
                    className="toggle"
                    checked={filters.showSimilarOnly}
                />
            </label>
        </div>
    );
};

export default Filters;

import { useState } from "react";
import { usePeople } from "../hooks/usePeople";
import SinglePerson from "./SinglePerson";
import Filters from "./Filters";
import { usePrice } from "../hooks/usePrice";
import stringSimilarity from "string-similarity";

const People = () => {
    const { people } = usePeople();
    const { price } = usePrice();
    const [filters, setFilters] = useState({
        fullName: "",
        type: "",
        showSimilarOnly: false,
    });
    const filteredPeople = people.filter((person) => {
        if (filters.showSimilarOnly && people.length > 1) {
            // Initialize a variable to keep track of whether the person is similar to any other person
            let isSimilarToAnyOther = false;

            // Iterate over each person in the list
            for (const otherPerson of people) {
                // Skip comparing the person with themselves
                if (person === otherPerson) continue;

                // Calculate the similarity score between the full names
                const similarityScore = stringSimilarity.compareTwoStrings(
                    person.fullName,
                    otherPerson.fullName
                );

                if (similarityScore >= 0.35) {
                    // If a similarity is found, set the flag and break out of the loop
                    isSimilarToAnyOther = true;
                    break;
                }
            }

            // Return true only if the person is similar to at least one other person
            return isSimilarToAnyOther;
        } else {
            // If showSimilarOnly is false, apply regular filters
            return (
                person.fullName
                    .toLowerCase()
                    .includes(filters.fullName.toLowerCase()) &&
                person.type.includes(filters.type)
            );
        }
    });

    const sortedPeople = filteredPeople.sort((a, b) => {
        if (a.fullName < b.fullName) {
            return -1;
        }
        if (a.fullName > b.fullName) {
            return 1;
        }
        return 0;
    });

    const expensesPerPerson = Number(price);
    const totalExpenses = people.length * expensesPerPerson;

    return (
        <>
            <h1 className="text-primary">Invited People ({people.length})</h1>
            <button
                className="btn btn-accent w-64"
                onClick={() => window.add_person_modal.showModal()}
            >
                Add a new person
            </button>
            <Filters filters={filters} setFilters={setFilters} />
            {sortedPeople.length > 0 ? (
                <div className="overflow-x-auto">
                    <table
                        className={`table table-zebra ${
                            people.length > 10 && "table-xs"
                        }`}
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPeople.map((person, idx) => (
                                <SinglePerson
                                    idx={idx}
                                    person={person}
                                    key={person.id}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No people on the list.</p>
            )}

            <button
                disabled={people.length < 2}
                className="btn btn-primary w-64"
                onClick={() => window.export_modal.showModal()}
            >
                Export List
            </button>

            {people.length > 1 && (
                <>
                    <p className="bg-info text-info-content p-3 rounded-btn">
                        Total expenses: {totalExpenses} ({people.length} people)
                    </p>
                    <button
                        onClick={() => window.meal_price_modal.showModal()}
                        className="btn btn-outline btn-secondary btn-sm"
                    >
                        Manage costs
                    </button>
                </>
            )}
        </>
    );
};

export default People;

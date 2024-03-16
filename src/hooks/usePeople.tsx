import useLocalStorageState from "use-local-storage-state";

export const usePeople = () => {
    const [people, setPeople] = useLocalStorageState<Person[]>("people-list", {
        defaultValue: [],
    });

    return { people, setPeople };
};

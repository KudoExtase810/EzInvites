import useLocalStorageState from "use-local-storage-state";

export const usePrice = () => {
    const [price, setPrice] = useLocalStorageState("meal-price", {
        defaultValue: "500",
    });
    return { price, setPrice };
};

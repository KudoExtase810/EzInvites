import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { FormEvent, useState } from "react";
import { usePrice } from "../hooks/usePrice";

const PriceChangerModal = () => {
    const { price, setPrice } = usePrice();
    const [statePrice, setStatePrice] = useState(price);

    const changePrice = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPrice(statePrice);
        toast.success("The meal price has been updated!");
    };

    return (
        <dialog className="modal max-sm:modal-bottom" id="meal_price_modal">
            <div className="modal-box max-w-lg">
                <button
                    type="button"
                    onClick={() => window.meal_price_modal.close()}
                >
                    <MdClose
                        size={32}
                        className="absolute right-6 top-6 hover:text-primary z-10"
                    />
                </button>
                <form className="p-4" onSubmit={changePrice}>
                    <input
                        placeholder="500"
                        value={statePrice}
                        onChange={(e) => setStatePrice(e.target.value)}
                        className="input input-bordered w-full"
                        type="text"
                    />
                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default PriceChangerModal;

import { useMoralis } from "react-moralis"

export default function Header() {
    const{ enableWeb3, account } = useMoralis()

    return (
        <div>
            <button>Connected</button>
        </div>
    )
}
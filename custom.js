const MoodContractAddress = "0x7A47C190E0177525CFf5f02759C0B79448ce0FD7";
const MoodContractABI = [{
    "inputs": [
        {
            "internalType": "string",
            "name": "_mood",
            "type": "string"
        }
    ],
    "name": "setMood",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "getMood",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}];
const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

let MoodContract = undefined;
let signer = undefined;

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
            MoodContractAddress,
            MoodContractABI,
            signer
        );
    });
});

async function getMood() {
    const mood = await MoodContract.getMood();
    document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
    console.log(mood);
}

async function setMood() {
    const mood = document.getElementById("mood").value;
    await MoodContract.setMood(mood);
}
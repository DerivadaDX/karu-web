import axios from "axios";

const getBalance = () => axios.get("https://8bb2e05b-06e9-4c9a-8080-02d3539f1a94.mock.pstmn.io/balance");

export { getBalance }
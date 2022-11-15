import axios from "axios";
const BILLING_URL = "http://localhost:8083/api/billing/"

//get all billing options
const getBillingOptions = async () => {
  const response = await axios.get(BILLING_URL);

  return response.data
}


//add a billing option 
const addBilling = async (billingData) => {
  const response = await axios.post(BILLING_URL, billingData)

  return response.data
}
const billingService = {
  getBillingOptions
}

export default billingService

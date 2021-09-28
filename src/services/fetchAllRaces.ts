import axios, { AxiosResponse } from "axios"

const FETCH_RACES_URL = 'https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10'

export const fetchAllRaces = async (): Promise<AxiosResponse<any>> =>
    axios
    .get(FETCH_RACES_URL)
    .then((response: { status: number; data: any; }) => {
    if (response.status >= 200 && response.status < 300) {
    return response.data.data
    }
    throw new Error(response.status.toString())
    })
    .catch((response: { status: number; data: any; })=> {
        throw new Error(response.status.toString())
    })

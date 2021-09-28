import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../reducers"
import { fetchAllRaces } from "../services/fetchAllRaces"
import { IRace, IRaces } from "../types"


export const useRaces = () => {
    const [nextToGoList, setNextToGoList] = useState<[] | null>(null)
    const [raceSummary, setRaceSummary] = useState<{[key: string]: any}>({})
    const [displayRaces, setDisplayRaces] = useState<IRaces>([])
    const filteredRaces: IRace[] = []
    const categoryMap = {
        greyhoud: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        harness: '161d9be2-e909-4326-8c2c-35ed71fb460b',
        horse: '4a2788f8-e825-4d36-9894-efd4baf1cfae'
    }    

    const greyhoudStatus = useSelector((state: RootState)=>state.category.isGreyHoundCheck)
    const harnessStatus = useSelector((state: RootState)=>state.category.isHarnessCheck)
    const horseStatus = useSelector((state: RootState)=>state.category.isHorseCheck)
    
    const dispatch = useDispatch()
    useEffect((): (() => void) =>{
        let mounted   = true
        fetchAllRaces().then((res: any) => {setRaceSummary(res.race_summaries); setNextToGoList(res.next_to_go_ids)})
        
        return () => (mounted = false)
    }, [])
    
    useEffect((): (() => void) => {
        const interval = setInterval(() => {
            fetchAllRaces().then((res: any) => {setNextToGoList(res.next_to_go_ids); setRaceSummary(res.race_summaries)})
        }, 10000)
        return () => clearInterval(interval)
    }, [])


    useEffect(() => {
        nextToGoList?.map(id => {
            if(raceSummary[id]){
            const {race_form, venue_id, venue_name,venue_state, venue_country, ...raceItems } = raceSummary[id]
            const {advertised_start: {seconds}} = raceItems
            if(Date.now()-seconds*1000 < 60*1000){
                filteredRaces?.push(raceItems as IRace)
            }
            }   
        })
        const greyhoudList = greyhoudStatus ? filteredRaces.filter((race)=>race.category_id === categoryMap.greyhoud) : null
        const harnessList = harnessStatus ? filteredRaces.filter((race)=>race.category_id === categoryMap.harness) : null
        const horseList = horseStatus ? filteredRaces.filter((race)=>race.category_id === categoryMap.horse) : null

        let finalRaces: any[] = []
        finalRaces = finalRaces.concat(greyhoudList,harnessList,horseList)

        const racesToShow = finalRaces?.filter(race => race).sort((prev,curr) => (prev.advertised_start.seconds >= curr.advertised_start.seconds) ? 1 : -1).slice(0,5)
        setDisplayRaces(racesToShow)

        dispatch({type:"UPDATE_RACES", payload: filteredRaces})

    }, [nextToGoList, greyhoudStatus, harnessStatus, horseStatus])

    return displayRaces
}